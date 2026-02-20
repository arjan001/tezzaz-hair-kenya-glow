import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data || []).forEach((row: { key: string; value: unknown }) => {
        map[row.key] = typeof row.value === "string" ? row.value.replace(/^"|"$/g, "") : String(row.value);
      });
      return map;
    },
  });
}

export function useUpdateSetting() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase.from("site_settings").upsert([{ key, value: JSON.stringify(value) }]);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site_settings"] }); toast({ title: "Setting saved!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useThemeSettings() {
  return useQuery({
    queryKey: ["theme_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("theme_settings").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateTheme() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (theme: Record<string, string>) => {
      // Get existing theme id first
      const { data: existing } = await supabase.from("theme_settings").select("id").maybeSingle();
      if (existing?.id) {
        const { error } = await supabase.from("theme_settings").update(theme).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("theme_settings").insert([theme]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["theme_settings"] }); toast({ title: "Theme saved!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
