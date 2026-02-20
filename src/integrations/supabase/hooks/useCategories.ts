import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return (data || []) as DbCategory[];
    },
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (cat: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase.from("categories").insert([cat as any]).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Failed to create category — check admin permissions");
      return data[0];
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); toast({ title: "Category added!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...update }: Partial<DbCategory> & { id: string }) => {
      const { data, error } = await supabase.from("categories").update(update).eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Failed to update category — check admin permissions");
      return data[0];
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); toast({ title: "Category updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      // First detach any products referencing this category to avoid foreign key constraint violation
      const { error: unlinkError } = await supabase
        .from("products")
        .update({ category_id: null })
        .eq("category_id", id);
      if (unlinkError) throw new Error("Failed to unlink products from category — " + unlinkError.message);

      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Category deleted!" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
