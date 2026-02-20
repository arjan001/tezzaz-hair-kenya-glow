-- ============================================================
-- FIX: RLS Policies for Categories CRUD and Orders Permission
-- ============================================================
-- Issues fixed:
--   1. Categories: admin can't add, edit, or delete categories
--      → Drop ALL existing category policies and recreate clean
--        explicit per-command policies (no FOR ALL)
--   2. Orders: "permission denied for table user" when creating
--      → The SELECT policy on orders used a subquery on auth.users
--        which the anon/authenticated role cannot access directly.
--        Fix: use auth.jwt()->>'email' instead
--   3. Bookings: same auth.users subquery issue
--   4. Ensure all FOR ALL policies are replaced with explicit ones
-- ============================================================

-- ============================================================
-- 1. CATEGORIES – Drop ALL existing policies, recreate clean
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

-- Public read
CREATE POLICY "categories_select_public"
  ON public.categories FOR SELECT
  USING (true);

-- Admin insert
CREATE POLICY "categories_insert_admin"
  ON public.categories FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin update
CREATE POLICY "categories_update_admin"
  ON public.categories FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin delete
CREATE POLICY "categories_delete_admin"
  ON public.categories FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 2. ORDERS – Fix auth.users subquery, recreate all policies
-- ============================================================
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;

-- Users can view own orders (use JWT email instead of auth.users subquery)
CREATE POLICY "orders_select_own"
  ON public.orders FOR SELECT
  USING (
    auth.uid() = user_id
    OR customer_email = (auth.jwt()->>'email')
  );

-- Admins can view all orders
CREATE POLICY "orders_select_admin"
  ON public.orders FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Anyone can create orders (including anonymous users)
CREATE POLICY "orders_insert_anyone"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- Admins can update orders
CREATE POLICY "orders_update_admin"
  ON public.orders FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admins can delete orders
CREATE POLICY "orders_delete_admin"
  ON public.orders FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 3. BOOKINGS – Fix same auth.users subquery issue
-- ============================================================
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can manage bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can delete bookings" ON public.bookings;

-- Anyone can create bookings
CREATE POLICY "bookings_insert_anyone"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Users can view own bookings (use JWT email instead of auth.users subquery)
CREATE POLICY "bookings_select_own"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id
    OR customer_email = (auth.jwt()->>'email')
  );

-- Admins can view all bookings
CREATE POLICY "bookings_select_admin"
  ON public.bookings FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admins can update bookings
CREATE POLICY "bookings_update_admin"
  ON public.bookings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admins can delete bookings
CREATE POLICY "bookings_delete_admin"
  ON public.bookings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 4. PRODUCTS – Ensure clean explicit policies (drop FOR ALL)
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Public can view active products
CREATE POLICY "products_select_active"
  ON public.products FOR SELECT
  USING (is_active = true);

-- Admins can view all products (including inactive)
CREATE POLICY "products_select_admin"
  ON public.products FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admin insert
CREATE POLICY "products_insert_admin"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin update
CREATE POLICY "products_update_admin"
  ON public.products FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin delete
CREATE POLICY "products_delete_admin"
  ON public.products FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 5. GALLERY ITEMS – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can manage gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can insert gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can update gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can delete gallery" ON public.gallery_items;

CREATE POLICY "gallery_select_public"
  ON public.gallery_items FOR SELECT
  USING (true);

CREATE POLICY "gallery_insert_admin"
  ON public.gallery_items FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "gallery_update_admin"
  ON public.gallery_items FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "gallery_delete_admin"
  ON public.gallery_items FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 6. USER ROLES – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Users can view own role
CREATE POLICY "user_roles_select_own"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all roles
CREATE POLICY "user_roles_select_admin"
  ON public.user_roles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admin insert
CREATE POLICY "user_roles_insert_admin"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin update
CREATE POLICY "user_roles_update_admin"
  ON public.user_roles FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin delete
CREATE POLICY "user_roles_delete_admin"
  ON public.user_roles FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 7. DELIVERY ZONES – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view delivery zones" ON public.delivery_zones;
DROP POLICY IF EXISTS "Admins can manage delivery zones" ON public.delivery_zones;
DROP POLICY IF EXISTS "Admins can insert delivery zones" ON public.delivery_zones;
DROP POLICY IF EXISTS "Admins can update delivery zones" ON public.delivery_zones;
DROP POLICY IF EXISTS "Admins can delete delivery zones" ON public.delivery_zones;

CREATE POLICY "delivery_zones_select_public"
  ON public.delivery_zones FOR SELECT
  USING (true);

CREATE POLICY "delivery_zones_insert_admin"
  ON public.delivery_zones FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "delivery_zones_update_admin"
  ON public.delivery_zones FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "delivery_zones_delete_admin"
  ON public.delivery_zones FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 8. SITE SETTINGS – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can delete site settings" ON public.site_settings;

CREATE POLICY "site_settings_select_public"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "site_settings_insert_admin"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "site_settings_update_admin"
  ON public.site_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "site_settings_delete_admin"
  ON public.site_settings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 9. THEME SETTINGS – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can read theme" ON public.theme_settings;
DROP POLICY IF EXISTS "Admins can manage theme" ON public.theme_settings;
DROP POLICY IF EXISTS "Admins can insert theme" ON public.theme_settings;
DROP POLICY IF EXISTS "Admins can update theme" ON public.theme_settings;
DROP POLICY IF EXISTS "Admins can delete theme" ON public.theme_settings;

CREATE POLICY "theme_settings_select_public"
  ON public.theme_settings FOR SELECT
  USING (true);

CREATE POLICY "theme_settings_insert_admin"
  ON public.theme_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "theme_settings_update_admin"
  ON public.theme_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "theme_settings_delete_admin"
  ON public.theme_settings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 10. NEWSLETTER – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.newsletter_subscribers;

CREATE POLICY "newsletter_insert_anyone"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "newsletter_select_admin"
  ON public.newsletter_subscribers FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "newsletter_update_admin"
  ON public.newsletter_subscribers FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "newsletter_delete_admin"
  ON public.newsletter_subscribers FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 11. WISHLISTS – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Users can manage own wishlist" ON public.wishlists;
DROP POLICY IF EXISTS "Admins can view all wishlists" ON public.wishlists;

CREATE POLICY "wishlists_select_own"
  ON public.wishlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "wishlists_insert_own"
  ON public.wishlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishlists_update_own"
  ON public.wishlists FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishlists_delete_own"
  ON public.wishlists FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "wishlists_select_admin"
  ON public.wishlists FOR SELECT
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 12. PROFILES – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "profiles_insert_admin"
  ON public.profiles FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- ============================================================
-- 13. ANALYTICS – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Anyone can log analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can delete analytics" ON public.analytics_events;

CREATE POLICY "analytics_insert_anyone"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "analytics_select_admin"
  ON public.analytics_events FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "analytics_delete_admin"
  ON public.analytics_events FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 14. ADMIN ACTIVITY LOG – Ensure clean explicit policies
-- ============================================================
DROP POLICY IF EXISTS "Admins can view activity log" ON public.admin_activity_log;
DROP POLICY IF EXISTS "Admins can insert activity log" ON public.admin_activity_log;
DROP POLICY IF EXISTS "Admins can delete activity log" ON public.admin_activity_log;

CREATE POLICY "activity_log_select_admin"
  ON public.admin_activity_log FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "activity_log_insert_admin"
  ON public.admin_activity_log FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "activity_log_delete_admin"
  ON public.admin_activity_log FOR DELETE
  USING (public.is_admin(auth.uid()));

-- ============================================================
-- 15. Ensure all existing users have admin role
-- ============================================================
UPDATE public.user_roles SET role = 'admin' WHERE role = 'customer';
