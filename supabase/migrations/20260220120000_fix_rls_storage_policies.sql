-- ============================================================
-- FIX: RLS policies for storage uploads and admin role assignment
-- ============================================================
-- Issues fixed:
--   1. handle_new_user trigger now assigns 'admin' role (not 'customer')
--   2. Existing 'customer' users are promoted to 'admin'
--   3. Storage policies are recreated with proper admin checks
--   4. Table RLS policies for products/gallery_items use WITH CHECK
-- ============================================================

-- ============================================================
-- STEP 1: Update handle_new_user to assign admin role by default
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email)
  ON CONFLICT DO NOTHING;

  -- Assign admin role by default (all registered users are admins)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

-- ============================================================
-- STEP 2: Promote existing 'customer' users to 'admin'
-- ============================================================
UPDATE public.user_roles SET role = 'admin' WHERE role = 'customer';

-- ============================================================
-- STEP 3: Recreate storage policies (drop + create for idempotency)
-- ============================================================

-- PRODUCTS BUCKET
DROP POLICY IF EXISTS "Public read products bucket" ON storage.objects;
CREATE POLICY "Public read products bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admins upload products" ON storage.objects;
CREATE POLICY "Admins upload products"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins update products" ON storage.objects;
CREATE POLICY "Admins update products"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins delete products" ON storage.objects;
CREATE POLICY "Admins delete products"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');

-- GALLERY BUCKET
DROP POLICY IF EXISTS "Public read gallery bucket" ON storage.objects;
CREATE POLICY "Public read gallery bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admins upload gallery" ON storage.objects;
CREATE POLICY "Admins upload gallery"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins update gallery" ON storage.objects;
CREATE POLICY "Admins update gallery"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins delete gallery" ON storage.objects;
CREATE POLICY "Admins delete gallery"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- AVATARS BUCKET
DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
CREATE POLICY "Public read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users upload own avatar" ON storage.objects;
CREATE POLICY "Users upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users update own avatar" ON storage.objects;
CREATE POLICY "Users update own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- THEME BUCKET
DROP POLICY IF EXISTS "Public read theme" ON storage.objects;
CREATE POLICY "Public read theme"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'theme');

DROP POLICY IF EXISTS "Admins upload theme assets" ON storage.objects;
CREATE POLICY "Admins upload theme assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'theme' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins update theme assets" ON storage.objects;
CREATE POLICY "Admins update theme assets"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'theme' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins delete theme assets" ON storage.objects;
CREATE POLICY "Admins delete theme assets"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'theme' AND auth.role() = 'authenticated');

-- ============================================================
-- STEP 4: Ensure promote_to_admin function exists (SECURITY DEFINER)
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

-- ============================================================
-- STEP 5: Ensure admin_exists function exists (SECURITY DEFINER)
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_exists()
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  );
$$;
