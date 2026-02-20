import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const getPeriodStart = (period: "today" | "7days" | "30days" | "90days") => {
  const now = new Date();
  const start = new Date(now);
  if (period === "today") {
    start.setHours(0, 0, 0, 0);
    return start;
  }
  const days = period === "7days" ? 7 : period === "30days" ? 30 : 90;
  start.setDate(now.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);
  return start;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
};

const formatRelative = (date: Date) => {
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return "Live";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
};

const pageNameMap: Record<string, string> = {
  "/": "Home",
  "/shop": "Shop",
  "/services": "Services",
  "/gallery": "Gallery",
  "/wishlist": "Wishlist",
  "/checkout": "Checkout",
  "/track-order": "Track Order",
};

export function useAnalytics(period: "today" | "7days" | "30days" | "90days") {
  return useQuery({
    queryKey: ["analytics", period],
    queryFn: async () => {
      const start = getPeriodStart(period).toISOString();
      const [ordersRes, productsRes, subscribersRes, galleryRes] = await Promise.all([
        supabase.from("orders").select("id, total, status, created_at").gte("created_at", start),
        supabase.from("products").select("id, name, price_num, badge, in_stock"),
        supabase.from("newsletter_subscribers").select("id, subscribed, created_at"),
        supabase.from("gallery_items").select("id"),
      ]);
      const analyticsRes = await supabase
        .from("analytics_events")
        .select("id, event_type, created_at, page, metadata, order_id")
        .gte("created_at", start);

      if (ordersRes.error) throw ordersRes.error;
      if (productsRes.error) throw productsRes.error;
      if (subscribersRes.error) throw subscribersRes.error;
      if (galleryRes.error) throw galleryRes.error;
      if (analyticsRes.error) throw analyticsRes.error;

      const orders = ordersRes.data || [];
      const products = productsRes.data || [];
      const subscribers = subscribersRes.data || [];
      const events = analyticsRes.data || [];

      const totalRevenue = orders
        .filter((o: { status: string }) => o.status === "confirmed" || o.status === "delivered")
        .reduce((s: number, o: { total: number }) => s + Number(o.total), 0);
      const totalOrders = orders.length;
      const pendingOrders = orders.filter((o: {status: string}) => o.status === "pending").length;
      const deliveredOrders = orders.filter((o: {status: string}) => o.status === "delivered").length;
      const totalProducts = products.length;
      const outOfStock = products.filter((p: {in_stock: boolean}) => !p.in_stock).length;
      const totalSubscribers = subscribers.filter((s: {subscribed: boolean}) => s.subscribed).length;
      const totalGallery = galleryRes.data?.length || 0;

      const pageViewEvents = events.filter((e: { event_type: string }) => e.event_type === "page_view");
      const visitorsSet = new Set<string>();
      const sessions: Record<string, { start: number; end: number; pageViews: number; visitorId: string }> = {};

      pageViewEvents.forEach((event) => {
        const meta = (event.metadata as Record<string, string>) || {};
        const visitorId = meta.visitor_id || "unknown";
        const sessionId = meta.session_id || `${visitorId}-session`;
        visitorsSet.add(visitorId);
        const ts = new Date(event.created_at).getTime();
        if (!sessions[sessionId]) {
          sessions[sessionId] = { start: ts, end: ts, pageViews: 1, visitorId };
        } else {
          sessions[sessionId].start = Math.min(sessions[sessionId].start, ts);
          sessions[sessionId].end = Math.max(sessions[sessionId].end, ts);
          sessions[sessionId].pageViews += 1;
        }
      });

      const totalSessions = Object.keys(sessions).length || 1;
      const bouncedSessions = Object.values(sessions).filter((s) => s.pageViews <= 1).length;
      const totalDurationSeconds = Object.values(sessions).reduce((sum, s) => sum + Math.max(0, (s.end - s.start) / 1000), 0);
      const avgSessionDuration = formatDuration(totalDurationSeconds / totalSessions);
      const bounceRate = Math.round((bouncedSessions / totalSessions) * 100);

      const visitorSessions: Record<string, number> = {};
      Object.values(sessions).forEach((s) => {
        visitorSessions[s.visitorId] = (visitorSessions[s.visitorId] || 0) + 1;
      });
      const returningVisitors = Object.values(visitorSessions).filter((count) => count > 1).length;
      const returningVisitorsRate = visitorsSet.size ? Math.round((returningVisitors / visitorsSet.size) * 100) : 0;

      const conversionRate = visitorsSet.size ? ((totalOrders / visitorsSet.size) * 100).toFixed(1) : "0.0";

      const pageCounts: Record<string, number> = {};
      pageViewEvents.forEach((event) => {
        const page = event.page || "/";
        pageCounts[page] = (pageCounts[page] || 0) + 1;
      });
      const topPages = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([path, views]) => ({
          path,
          name: pageNameMap[path] || path,
          views,
          percentage: pageViewEvents.length ? Math.round((views / pageViewEvents.length) * 100) : 0,
        }));

      const sourceCounts: Record<string, number> = {};
      pageViewEvents.forEach((event) => {
        const meta = (event.metadata as Record<string, string>) || {};
        const referrer = meta.referrer || "";
        let source = "Direct";
        if (referrer) {
          try {
            source = new URL(referrer).hostname.replace("www.", "");
          } catch {
            source = "Referral";
          }
        }
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      });
      const trafficSources = Object.entries(sourceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, visits]) => ({
          name,
          visits,
          percentage: pageViewEvents.length ? Math.round((visits / pageViewEvents.length) * 100) : 0,
        }));

      const deviceCounts: Record<string, number> = {};
      pageViewEvents.forEach((event) => {
        const meta = (event.metadata as Record<string, string>) || {};
        const device = meta.device_type || "Desktop";
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      });
      const deviceBreakdown = Object.entries(deviceCounts).map(([name, count]) => ({
        name,
        percentage: pageViewEvents.length ? Math.round((count / pageViewEvents.length) * 100) : 0,
      }));

      const recentActivity = events
        .slice()
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 8)
        .map((event) => {
          const meta = (event.metadata as Record<string, string>) || {};
          const time = formatRelative(new Date(event.created_at));
          if (event.event_type === "order_confirmed") {
            return {
              type: "order",
              message: `Order confirmed${meta.order_code ? `: ${meta.order_code}` : ""}`,
              time,
            };
          }
          if (event.event_type === "order_delivered") {
            return {
              type: "order",
              message: `Order delivered${meta.order_code ? `: ${meta.order_code}` : ""}`,
              time,
            };
          }
          return {
            type: "page",
            message: `Page view: ${event.page || "/"}`,
            time,
          };
        });

      // Revenue by month (last 6 months)
      const now = new Date();
      const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
        const month = d.toLocaleString("default", { month: "short" });
        const rev = orders.filter((o: {created_at: string; status: string; total: number}) => {
          const oDate = new Date(o.created_at);
          return oDate.getMonth() === d.getMonth() && oDate.getFullYear() === d.getFullYear() && (o.status === "confirmed" || o.status === "delivered");
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

      return {
        totalRevenue,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalProducts,
        outOfStock,
        totalSubscribers,
        totalGallery,
        monthlyRevenue,
        statusBreakdown,
        recentOrders: orders.slice(0, 5),
        visitors: visitorsSet.size,
        pageViews: pageViewEvents.length,
        bounceRate,
        avgSessionDuration,
        conversionRate,
        returningVisitors: returningVisitorsRate,
        topPages,
        trafficSources,
        deviceBreakdown,
        recentActivity,
      };
    },
  });
}
