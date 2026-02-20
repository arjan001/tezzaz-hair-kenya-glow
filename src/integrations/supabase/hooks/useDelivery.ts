import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbDeliveryZone {
  id: string;
  zone_name: string;
  areas: string[];
  fee: number;
  free_above: number | null;
  estimated_days: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useDeliveryZones() {
  return useQuery({
    queryKey: ["delivery_zones"],
    queryFn: async () => {
      const { data, error } = await supabase.from("delivery_zones").select("*").order("fee");
      if (error) throw error;
      return (data || []) as DbDeliveryZone[];
    },
  });
}

export function useCreateDeliveryZone() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (zone: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase.from("delivery_zones").insert([zone as any]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["delivery_zones"] }); toast({ title: "Zone added!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateDeliveryZone() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...update }: Partial<DbDeliveryZone> & { id: string }) => {
      const { data, error } = await supabase.from("delivery_zones").update(update).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["delivery_zones"] }); toast({ title: "Zone updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteDeliveryZone() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("delivery_zones").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["delivery_zones"] }); toast({ title: "Zone deleted!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
