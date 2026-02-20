import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DbBooking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service: string;
  booking_date: string | null;
  booking_time: string | null;
  notes: string | null;
  status: string;
  user_id: string | null;
  created_at: string;
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as DbBooking[];
    },
  });
}

export function useCreateBooking() {
  const { toast } = useToast();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (booking: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await supabase.from("bookings").insert([booking as any]).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Failed to create booking");
      return data[0];
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      toast({ title: "Booking confirmed!", description: "We'll contact you to confirm your appointment." });
    },
    onError: (e: Error) => toast({ title: "Booking failed", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bookings"] }); toast({ title: "Booking updated!" }); },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
