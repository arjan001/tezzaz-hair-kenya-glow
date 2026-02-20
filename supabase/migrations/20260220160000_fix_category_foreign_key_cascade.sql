-- ============================================================
-- FIX: Change products.category_id foreign key to ON DELETE SET NULL
-- ============================================================
-- Issue: Deleting a category fails when products reference it
--        because the default foreign key behavior is RESTRICT.
-- Fix:   Drop and recreate the constraint with ON DELETE SET NULL
--        so that deleting a category sets category_id to NULL on
--        products instead of blocking the deletion.
-- ============================================================

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_category_id_fkey;

ALTER TABLE public.products
  ADD CONSTRAINT products_category_id_fkey
  FOREIGN KEY (category_id)
  REFERENCES public.categories (id)
  ON DELETE SET NULL;
