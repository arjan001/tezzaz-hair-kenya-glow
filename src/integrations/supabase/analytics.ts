import { supabase } from "@/integrations/supabase/client";

type AnalyticsMetadata = Record<string, unknown>;

const VISITOR_KEY = "tezzaz_visitor_id";
const SESSION_KEY = "tezzaz_session_id";

const createId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

const getVisitorId = () => {
  if (typeof localStorage === "undefined") return "anonymous";
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const next = `v_${createId()}`;
  localStorage.setItem(VISITOR_KEY, next);
  return next;
};

const getSessionId = () => {
  if (typeof sessionStorage === "undefined") return "session";
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const next = `s_${createId()}`;
  sessionStorage.setItem(SESSION_KEY, next);
  return next;
};

const getDeviceType = () => {
  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent;
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "Tablet";
    if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "Mobile";
  }
  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) return "Mobile";
    if (window.innerWidth < 1024) return "Tablet";
  }
  return "Desktop";
};

const getReferrer = () => {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
};

export async function trackAnalyticsEvent({
  event_type,
  page,
  metadata = {},
  order_id,
  product_id,
}: {
  event_type: string;
  page?: string | null;
  metadata?: AnalyticsMetadata;
  order_id?: string | null;
  product_id?: string | null;
}) {
  if (typeof window === "undefined") return;

  const enrichedMetadata: AnalyticsMetadata = {
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    referrer: getReferrer(),
    user_agent: navigator.userAgent,
    device_type: getDeviceType(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
    path: window.location.pathname + window.location.search,
    title: document.title,
    ...metadata,
  };

  const { error } = await supabase.from("analytics_events").insert([
    {
      event_type,
      page: page ?? window.location.pathname,
      metadata: enrichedMetadata,
      order_id: order_id ?? null,
      product_id: product_id ?? null,
    },
  ]);

  if (error) {
    // Avoid breaking UX on analytics write failures.
    console.warn("Analytics event failed:", error.message);
  }
}
