-- ============================================================
-- TEZZAZ HAIR – STORAGE BUCKETS SETUP SCRIPT
-- Run this to ensure all storage buckets exist with correct policies
-- ============================================================

-- 1. CREATE BUCKETS (idempotent – will not duplicate)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880,  -- 5MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  5242880,  -- 5MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152,  -- 2MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'theme',
  'theme',
  true,
  5242880,  -- 5MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. STORAGE POLICIES (drop-and-recreate to ensure correctness)

-- PRODUCTS BUCKET
DROP POLICY IF EXISTS "Public read products bucket" ON storage.objects;
CREATE POLICY "Public read products bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admins upload products" ON storage.objects;
CREATE POLICY "Admins upload products"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins update products" ON storage.objects;
CREATE POLICY "Admins update products"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'products' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins delete products" ON storage.objects;
CREATE POLICY "Admins delete products"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND public.is_admin(auth.uid()));

-- GALLERY BUCKET
DROP POLICY IF EXISTS "Public read gallery bucket" ON storage.objects;
CREATE POLICY "Public read gallery bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admins upload gallery" ON storage.objects;
CREATE POLICY "Admins upload gallery"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins update gallery" ON storage.objects;
CREATE POLICY "Admins update gallery"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins delete gallery" ON storage.objects;
CREATE POLICY "Admins delete gallery"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

-- AVATARS BUCKET
DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
CREATE POLICY "Public read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users upload own avatar" ON storage.objects;
CREATE POLICY "Users upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users update own avatar" ON storage.objects;
CREATE POLICY "Users update own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- THEME BUCKET
DROP POLICY IF EXISTS "Public read theme" ON storage.objects;
CREATE POLICY "Public read theme"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'theme');

DROP POLICY IF EXISTS "Admins upload theme assets" ON storage.objects;
CREATE POLICY "Admins upload theme assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'theme' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins update theme assets" ON storage.objects;
CREATE POLICY "Admins update theme assets"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'theme' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins delete theme assets" ON storage.objects;
CREATE POLICY "Admins delete theme assets"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'theme' AND public.is_admin(auth.uid()));
