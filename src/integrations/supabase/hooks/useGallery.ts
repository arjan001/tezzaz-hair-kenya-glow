import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbGalleryItem {
  id: string;
  style_name: string;
  description: string | null;
  price: number | null;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as DbGalleryItem[];
    },
  });
}

export function useCreateGalleryItem() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (item: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase.from("gallery_items").insert([item as any]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast({ title: "Gallery item added!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateGalleryItem() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...update }: Partial<DbGalleryItem> & { id: string }) => {
      const { data, error } = await supabase.from("gallery_items").update(update).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast({ title: "Gallery item updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast({ title: "Item deleted!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export async function uploadGalleryImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `gallery/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("gallery").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("gallery").getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `products/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("products").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("products").getPublicUrl(path);
  return data.publicUrl;
}
