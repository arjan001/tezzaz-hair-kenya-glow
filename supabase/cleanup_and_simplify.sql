-- ============================================================
-- TEZZAZ HAIR – CLEANUP & SIMPLIFY ADMIN SYSTEM
-- ============================================================
-- This script will:
--   1. Delete ALL users from the system (auth.users, profiles, user_roles)
--   2. Remove the permissions table and check_permission function
--   3. Simplify the admin system: any registered admin gets full access
--   4. Update the handle_new_user trigger to auto-assign admin role
--   5. Update the admin_exists / promote_to_admin functions
-- ============================================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ============================================================
-- STEP 1: DELETE ALL EXISTING USERS
-- ============================================================
-- Delete from user_roles first (FK to auth.users)
DELETE FROM public.user_roles;

-- Delete from profiles (FK to auth.users)
DELETE FROM public.profiles;

-- Delete from admin_activity_log (FK to auth.users)
DELETE FROM public.admin_activity_log;

-- Delete from wishlists (FK to auth.users)
DELETE FROM public.wishlists;

-- Delete all users from Supabase auth
DELETE FROM auth.users;

DO $msg$ BEGIN RAISE NOTICE 'All users deleted successfully.'; END $msg$;

-- ============================================================
-- STEP 2: DROP THE PERMISSIONS TABLE & RELATED OBJECTS
-- ============================================================
-- Drop policies on permissions table
DROP POLICY IF EXISTS "Admins can manage permissions" ON public.permissions;
DROP POLICY IF EXISTS "Authenticated users can read own role permissions" ON public.permissions;

-- Drop the permissions table
DROP TABLE IF EXISTS public.permissions CASCADE;

-- Drop the check_permission function (no longer needed)
DROP FUNCTION IF EXISTS public.check_permission(TEXT, TEXT);

-- Drop the permissions index
DROP INDEX IF EXISTS idx_permissions_role;

DO $msg$ BEGIN RAISE NOTICE 'Permissions table and check_permission function removed.'; END $msg$;

-- ============================================================
-- STEP 3: SIMPLIFY HANDLE_NEW_USER TRIGGER
-- ============================================================
-- When a new user signs up, auto-create profile and assign admin role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email)
  ON CONFLICT DO NOTHING;

  -- Assign admin role by default (all system users are admins)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

DO $msg$ BEGIN RAISE NOTICE 'handle_new_user trigger updated to auto-assign admin role.'; END $msg$;

-- ============================================================
-- STEP 4: UPDATE admin_exists FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_exists()
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  );
$$;

-- ============================================================
-- STEP 5: UPDATE promote_to_admin FUNCTION (simplified)
-- ============================================================
CREATE OR REPLACE FUNCTION public.promote_to_admin(_user_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Remove any existing non-admin role
  DELETE FROM public.user_roles WHERE user_id = _user_id AND role != 'admin';
  -- Insert admin role
  INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

DO $msg$ BEGIN RAISE NOTICE 'RPC functions updated.'; END $msg$;

-- ============================================================
-- DONE!
-- ============================================================
-- All users have been removed. The permissions system is gone.
-- Now go to your app at /admin/register to create your first admin.
-- Every user registered through the admin panel will automatically
-- be an admin with full access to everything.
-- ============================================================
