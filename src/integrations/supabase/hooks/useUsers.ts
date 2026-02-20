import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  role?: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: profiles, error: pErr } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (pErr) throw pErr;

      const { data: roles, error: rErr } = await supabase.from("user_roles").select("user_id, role");
      if (rErr) throw rErr;

      const roleMap: Record<string, string> = {};
      (roles || []).forEach((r: { user_id: string; role: string }) => { roleMap[r.user_id] = r.role; });

      return (profiles || []).map((p: DbProfile) => ({ ...p, role: roleMap[p.id] || "customer" }));
    },
  });
}

type AppRole = "admin" | "manager" | "staff" | "customer";

export function useUpdateUserRole() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      // Delete existing role first, then insert new one
      await supabase.from("user_roles").delete().eq("user_id", userId);
      const { error } = await supabase.from("user_roles").insert([{ user_id: userId, role }]);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast({ title: "Role updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
