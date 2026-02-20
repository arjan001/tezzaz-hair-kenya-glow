-- ============================================================
-- FIX RLS POLICIES ON ALL ADMIN MODELS
-- ============================================================
-- This migration replaces all FOR ALL policies with explicit
-- per-command policies (INSERT, UPDATE, DELETE) to resolve the
-- PostgREST "can't coerce result to single object" error that
-- occurs when FOR ALL policies conflict with FOR SELECT policies
-- during .insert().select() or .update().select() operations.
-- ============================================================

-- ============================================================
-- 1. CATEGORIES
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 2. GALLERY ITEMS
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage gallery" ON public.gallery_items;

CREATE POLICY "Admins can insert gallery"
  ON public.gallery_items FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update gallery"
  ON public.gallery_items FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete gallery"
  ON public.gallery_items FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 3. USER ROLES
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Also allow admins to view all roles (needed for user management)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 4. ORDERS
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 5. NEWSLETTER SUBSCRIBERS
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can update subscribers"
  ON public.newsletter_subscribers FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete subscribers"
  ON public.newsletter_subscribers FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 6. BOOKINGS
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage bookings" ON public.bookings;

CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete bookings"
  ON public.bookings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 7. DELIVERY ZONES
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage delivery zones" ON public.delivery_zones;

CREATE POLICY "Admins can insert delivery zones"
  ON public.delivery_zones FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update delivery zones"
  ON public.delivery_zones FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete delivery zones"
  ON public.delivery_zones FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 8. SITE SETTINGS
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete site settings"
  ON public.site_settings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 9. THEME SETTINGS
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage theme" ON public.theme_settings;

CREATE POLICY "Admins can insert theme"
  ON public.theme_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update theme"
  ON public.theme_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete theme"
  ON public.theme_settings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 10. ADMIN ACTIVITY LOG (add RLS if table exists)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Admins can view all activity logs
CREATE POLICY "Admins can view activity log"
  ON public.admin_activity_log FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admins can insert activity logs
CREATE POLICY "Admins can insert activity log"
  ON public.admin_activity_log FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Admins can delete activity logs
CREATE POLICY "Admins can delete activity log"
  ON public.admin_activity_log FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 11. ANALYTICS EVENTS – add admin management policies
-- ============================================================
-- Admin delete policy (for cleanup)
CREATE POLICY "Admins can delete analytics"
  ON public.analytics_events FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 12. PROFILES – add admin insert policy for completeness
-- ============================================================
CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- ============================================================
-- 13. PRODUCTS – verify explicit policies exist (already correct
-- in original migration, but ensure WITH CHECK on update)
-- ============================================================
-- Products already have explicit per-command policies, no changes needed.

-- ============================================================
-- 14. WISHLISTS – add admin view policy for user management
-- ============================================================
CREATE POLICY "Admins can view all wishlists"
  ON public.wishlists FOR SELECT
  USING (public.is_admin(auth.uid()));
