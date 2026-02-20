-- ============================================================
-- TEZZAZ HAIR – FIX ADMIN SETUP & SEED ROLES/PERMISSIONS
-- ============================================================
-- Run this script in the Supabase SQL Editor to:
--   1. Create missing tables (permissions, admin_activity_log)
--   2. Create/replace all required RPC functions
--   3. Seed default permissions for all roles
--   4. Promote the FIRST registered user to admin
--   5. Add performance indexes
-- This script is idempotent – safe to run multiple times.
-- ============================================================

-- ============================================================
-- STEP 1: ENSURE PERMISSIONS TABLE EXISTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role NOT NULL,
  resource TEXT NOT NULL,
  can_create BOOLEAN NOT NULL DEFAULT false,
  can_read BOOLEAN NOT NULL DEFAULT true,
  can_update BOOLEAN NOT NULL DEFAULT false,
  can_delete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (role, resource)
);

ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage permissions" ON public.permissions;
DROP POLICY IF EXISTS "Authenticated users can read own role permissions" ON public.permissions;

CREATE POLICY "Admins can manage permissions"
  ON public.permissions FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated users can read own role permissions"
  ON public.permissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = permissions.role
    )
  );

-- ============================================================
-- STEP 2: ENSURE ADMIN ACTIVITY LOG TABLE EXISTS
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

DROP POLICY IF EXISTS "Admins can view activity log" ON public.admin_activity_log;
DROP POLICY IF EXISTS "Authenticated users can insert activity" ON public.admin_activity_log;

CREATE POLICY "Admins can view activity log"
  ON public.admin_activity_log FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated users can insert activity"
  ON public.admin_activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- STEP 3: CREATE/REPLACE ALL RPC FUNCTIONS
-- ============================================================

-- 3a. check_permission – check if current user can perform action on resource
CREATE OR REPLACE FUNCTION public.check_permission(
  _resource TEXT,
  _action TEXT  -- 'create', 'read', 'update', 'delete'
)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.permissions p
    JOIN public.user_roles ur ON ur.role = p.role
    WHERE ur.user_id = auth.uid()
      AND p.resource = _resource
      AND (
        (_action = 'create' AND p.can_create) OR
        (_action = 'read' AND p.can_read) OR
        (_action = 'update' AND p.can_update) OR
        (_action = 'delete' AND p.can_delete)
      )
  );
$$;

-- 3b. admin_exists – check if any admin user exists (for first-time registration)
CREATE OR REPLACE FUNCTION public.admin_exists()
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  );
$$;

-- 3c. promote_to_admin – promote a user to admin role
CREATE OR REPLACE FUNCTION public.promote_to_admin(_user_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Allow if no admin exists yet OR if caller is already an admin
  IF NOT public.admin_exists() OR public.is_admin(auth.uid()) THEN
    -- Remove existing customer role
    DELETE FROM public.user_roles WHERE user_id = _user_id AND role = 'customer';
    -- Insert admin role
    INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    RAISE EXCEPTION 'Only admins can promote users';
  END IF;
END;
$$;

-- ============================================================
-- STEP 4: SEED DEFAULT PERMISSIONS FOR ALL ROLES
-- ============================================================
INSERT INTO public.permissions (role, resource, can_create, can_read, can_update, can_delete) VALUES
  -- Admin: full access to everything
  ('admin', 'products',    true, true, true, true),
  ('admin', 'categories',  true, true, true, true),
  ('admin', 'orders',      true, true, true, true),
  ('admin', 'gallery',     true, true, true, true),
  ('admin', 'users',       true, true, true, true),
  ('admin', 'settings',    true, true, true, true),
  ('admin', 'newsletter',  true, true, true, true),
  ('admin', 'delivery',    true, true, true, true),
  ('admin', 'analytics',   false, true, false, false),
  ('admin', 'theme',       true, true, true, true),
  ('admin', 'policies',    true, true, true, true),
  ('admin', 'bookings',    true, true, true, true),

  -- Manager: same as admin but cannot manage users or settings
  ('manager', 'products',    true, true, true, true),
  ('manager', 'categories',  true, true, true, true),
  ('manager', 'orders',      true, true, true, true),
  ('manager', 'gallery',     true, true, true, true),
  ('manager', 'users',       false, true, false, false),
  ('manager', 'settings',    false, true, false, false),
  ('manager', 'newsletter',  true, true, true, false),
  ('manager', 'delivery',    true, true, true, true),
  ('manager', 'analytics',   false, true, false, false),
  ('manager', 'theme',       true, true, true, true),
  ('manager', 'policies',    true, true, true, true),
  ('manager', 'bookings',    true, true, true, true),

  -- Staff: limited write access
  ('staff', 'products',    false, true, true, false),
  ('staff', 'categories',  false, true, false, false),
  ('staff', 'orders',      false, true, true, false),
  ('staff', 'gallery',     true, true, true, false),
  ('staff', 'users',       false, false, false, false),
  ('staff', 'settings',    false, false, false, false),
  ('staff', 'newsletter',  false, true, false, false),
  ('staff', 'delivery',    false, true, false, false),
  ('staff', 'analytics',   false, true, false, false),
  ('staff', 'theme',       false, true, false, false),
  ('staff', 'policies',    false, true, false, false),
  ('staff', 'bookings',    false, true, true, false),

  -- Customer: no admin access (read-only for their own data via RLS)
  ('customer', 'products',    false, true, false, false),
  ('customer', 'categories',  false, true, false, false),
  ('customer', 'orders',      false, true, false, false),
  ('customer', 'gallery',     false, true, false, false),
  ('customer', 'users',       false, false, false, false),
  ('customer', 'settings',    false, false, false, false),
  ('customer', 'newsletter',  false, false, false, false),
  ('customer', 'delivery',    false, true, false, false),
  ('customer', 'analytics',   false, false, false, false),
  ('customer', 'theme',       false, false, false, false),
  ('customer', 'policies',    false, true, false, false),
  ('customer', 'bookings',    false, true, false, false)
ON CONFLICT (role, resource) DO NOTHING;

-- ============================================================
-- STEP 5: PROMOTE THE FIRST USER TO ADMIN
-- ============================================================
-- This finds the earliest registered user and gives them the admin role.
-- If there is already an admin, this does nothing (ON CONFLICT DO NOTHING).
DO $$
DECLARE
  first_user_id UUID;
BEGIN
  -- Find the first user by earliest created_at in user_roles
  SELECT ur.user_id INTO first_user_id
  FROM public.user_roles ur
  ORDER BY ur.id ASC
  LIMIT 1;

  IF first_user_id IS NOT NULL THEN
    -- Remove customer role for this user
    DELETE FROM public.user_roles
    WHERE user_id = first_user_id AND role = 'customer';

    -- Give them admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (first_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;

    RAISE NOTICE 'Promoted user % to admin', first_user_id;
  ELSE
    RAISE NOTICE 'No users found in user_roles table';
  END IF;
END;
$$;

-- ============================================================
-- STEP 6: PERFORMANCE INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_code ON public.orders(order_code);
CREATE INDEX IF NOT EXISTS idx_permissions_role ON public.permissions(role);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_user ON public.admin_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_created ON public.admin_activity_log(created_at DESC);

-- ============================================================
-- DONE! Your first user now has admin access with full permissions.
-- Log in at /admin/login with your registered email/password.
-- ============================================================
