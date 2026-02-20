-- ============================================================
-- FIX: Storage RLS policies for gallery/products images
-- ============================================================
-- Issue: Admin uploads fail due to missing storage policies
-- Fix: Allow public read and admin write access per bucket

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Buckets: allow public read for gallery/products buckets
DROP POLICY IF EXISTS "storage_buckets_select_gallery_products" ON storage.buckets;
CREATE POLICY "storage_buckets_select_gallery_products"
  ON storage.buckets FOR SELECT
  USING (id IN ('gallery', 'products'));

-- Gallery bucket policies
DROP POLICY IF EXISTS "gallery_objects_select_public" ON storage.objects;
DROP POLICY IF EXISTS "gallery_objects_insert_admin" ON storage.objects;
DROP POLICY IF EXISTS "gallery_objects_update_admin" ON storage.objects;
DROP POLICY IF EXISTS "gallery_objects_delete_admin" ON storage.objects;

CREATE POLICY "gallery_objects_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "gallery_objects_insert_admin"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

CREATE POLICY "gallery_objects_update_admin"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

CREATE POLICY "gallery_objects_delete_admin"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

-- Products bucket policies
DROP POLICY IF EXISTS "products_objects_select_public" ON storage.objects;
DROP POLICY IF EXISTS "products_objects_insert_admin" ON storage.objects;
DROP POLICY IF EXISTS "products_objects_update_admin" ON storage.objects;
DROP POLICY IF EXISTS "products_objects_delete_admin" ON storage.objects;

CREATE POLICY "products_objects_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

CREATE POLICY "products_objects_insert_admin"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND public.is_admin(auth.uid()));

CREATE POLICY "products_objects_update_admin"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'products' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'products' AND public.is_admin(auth.uid()));

CREATE POLICY "products_objects_delete_admin"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND public.is_admin(auth.uid()));
