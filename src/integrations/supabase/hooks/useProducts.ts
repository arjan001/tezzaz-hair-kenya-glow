import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbProduct {
  id: string;
  name: string;
  slug: string | null;
  description: string;
  details: string | null;
  category_id: string | null;
  category_name: string | null;
  price_num: number;
  original_price: number | null;
  badge: string | null;
  img_url: string | null;
  in_stock: boolean;
  shipping_info: string | null;
  tags: string[] | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useProducts(onlyActive = true) {
  return useQuery({
    queryKey: ["products", onlyActive],
    queryFn: async () => {
      let q = supabase.from("products").select("*").order("sort_order", { ascending: true });
      if (onlyActive) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as DbProduct[];
    },
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (product: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase.from("products").insert([product as any]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); toast({ title: "Product added!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...update }: Partial<DbProduct> & { id: string }) => {
      const { data, error } = await supabase.from("products").update(update).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); toast({ title: "Product updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); toast({ title: "Product deleted!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
