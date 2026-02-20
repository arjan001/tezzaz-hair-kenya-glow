import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbSubscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed: boolean;
  created_at: string;
}

export function useSubscribers() {
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as DbSubscriber[];
    },
  });
}

export function useSubscribe() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ email, name }: { email: string; name?: string }) => {
      const { error } = await supabase.from("newsletter_subscribers").upsert([{ email, name, subscribed: true }], { onConflict: "email" });
      if (error) throw error;
    },
    onSuccess: () => toast({ title: "Subscribed!", description: "You'll receive our latest offers." }),
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteSubscriber() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["subscribers"] }); toast({ title: "Subscriber removed" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
