import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const [ordersRes, productsRes, subscribersRes, galleryRes] = await Promise.all([
        supabase.from("orders").select("id, total, status, created_at"),
        supabase.from("products").select("id, name, price_num, badge, in_stock"),
        supabase.from("newsletter_subscribers").select("id, subscribed, created_at"),
        supabase.from("gallery_items").select("id"),
      ]);

      const orders = ordersRes.data || [];
      const products = productsRes.data || [];
      const subscribers = subscribersRes.data || [];

      const totalRevenue = orders.filter((o: {status: string}) => o.status === "delivered").reduce((s: number, o: {total: number}) => s + Number(o.total), 0);
      const totalOrders = orders.length;
      const pendingOrders = orders.filter((o: {status: string}) => o.status === "pending").length;
      const deliveredOrders = orders.filter((o: {status: string}) => o.status === "delivered").length;
      const totalProducts = products.length;
      const outOfStock = products.filter((p: {in_stock: boolean}) => !p.in_stock).length;
      const totalSubscribers = subscribers.filter((s: {subscribed: boolean}) => s.subscribed).length;
      const totalGallery = galleryRes.data?.length || 0;

      // Revenue by month (last 6 months)
      const now = new Date();
      const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
        const month = d.toLocaleString("default", { month: "short" });
        const rev = orders.filter((o: {created_at: string; status: string; total: number}) => {
          const oDate = new Date(o.created_at);
          return oDate.getMonth() === d.getMonth() && oDate.getFullYear() === d.getFullYear() && o.status === "delivered";
        }).reduce((s: number, o: {total: number}) => s + Number(o.total), 0);
        return { month, revenue: rev };
      });

      // Order status breakdown
      const statusBreakdown = [
        { name: "Pending", value: pendingOrders },
        { name: "Confirmed", value: orders.filter((o: {status: string}) => o.status === "confirmed").length },
        { name: "Dispatched", value: orders.filter((o: {status: string}) => o.status === "dispatched").length },
        { name: "Delivered", value: deliveredOrders },
      ];

      return { totalRevenue, totalOrders, pendingOrders, deliveredOrders, totalProducts, outOfStock, totalSubscribers, totalGallery, monthlyRevenue, statusBreakdown, recentOrders: orders.slice(0, 5) };
    },
  });
}
