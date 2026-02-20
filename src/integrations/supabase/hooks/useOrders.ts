import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbOrder {
  id: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  city: string;
  notes: string | null;
  items: { name: string; qty: number; price: number; img?: string }[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  mpesa_message: string | null;
  mpesa_phone: string | null;
  status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as DbOrder[];
    },
  });
}

export function useOrderByCode(code: string) {
  return useQuery({
    queryKey: ["order", code],
    enabled: !!code,
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("order_code", code).maybeSingle();
      if (error) throw error;
      return data as DbOrder | null;
    },
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (order: Omit<DbOrder, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("orders").insert([order]).select().single();
      if (error) throw error;
      return data as DbOrder;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["orders"] }); },
    onError: (e: Error) => toast({ title: "Error placing order", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: DbOrder["status"] }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["orders"] }); toast({ title: "Order status updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteOrder() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["orders"] }); toast({ title: "Order deleted!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
