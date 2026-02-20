
-- ============================================================
-- TEZZAZ HAIR – FULL BACKEND SCHEMA
-- ============================================================

-- 1. APP ROLES ENUM
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'staff', 'customer');

-- 2. PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. USER ROLES (separate table – no roles on profiles!)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'customer',
  UNIQUE (user_id, role)
);

-- 4. CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. PRODUCTS
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT,
  description TEXT NOT NULL DEFAULT '',
  details TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT,
  price_num NUMERIC(12,2) NOT NULL DEFAULT 0,
  original_price NUMERIC(12,2),
  badge TEXT,
  img_url TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  shipping_info TEXT,
  tags TEXT[],
  sort_order INT DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. GALLERY
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  style_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2),
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. ORDERS
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Nairobi',
  notes TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  delivery_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'mpesa',
  mpesa_message TEXT,
  mpesa_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. WISHLIST
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- 9. NEWSLETTER SUBSCRIBERS
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. BOOKINGS
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date DATE,
  booking_time TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. DELIVERY ZONES
CREATE TABLE public.delivery_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_name TEXT NOT NULL,
  areas TEXT[] NOT NULL DEFAULT '{}',
  fee NUMERIC(12,2) NOT NULL DEFAULT 0,
  free_above NUMERIC(12,2),
  estimated_days TEXT NOT NULL DEFAULT '1-3',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. SITE SETTINGS (key-value)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. THEME SETTINGS
CREATE TABLE public.theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT DEFAULT '#000000',
  accent_color TEXT DEFAULT '#C9A96E',
  background_color TEXT DEFAULT '#FFFFFF',
  font_heading TEXT DEFAULT 'Playfair Display',
  font_body TEXT DEFAULT 'Inter',
  hero_text TEXT,
  hero_subtext TEXT,
  logo_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. ANALYTICS EVENTS
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  page TEXT,
  product_id UUID,
  order_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('theme', 'theme', true) ON CONFLICT DO NOTHING;

-- ============================================================
-- SECURITY DEFINER FUNCTION FOR ROLE CHECKS
-- ============================================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'manager');
$$;

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_gallery_updated BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_delivery_updated BEFORE UPDATE ON public.delivery_zones FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- RLS – ENABLE ON ALL TABLES
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- PROFILES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (public.is_admin(auth.uid()));

-- USER ROLES
CREATE POLICY "Users can view own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.is_admin(auth.uid()));

-- CATEGORIES – public read, admin write
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin(auth.uid()));

-- PRODUCTS – public read active, admin full
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.is_admin(auth.uid()));

-- GALLERY – public read
CREATE POLICY "Anyone can view gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery_items FOR ALL USING (public.is_admin(auth.uid()));

-- ORDERS – own orders or admin
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()));
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL USING (public.is_admin(auth.uid()));

-- WISHLISTS
CREATE POLICY "Users can manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- NEWSLETTER
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can manage subscribers" ON public.newsletter_subscribers FOR ALL USING (public.is_admin(auth.uid()));

-- BOOKINGS
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id OR customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()));
CREATE POLICY "Admins can manage bookings" ON public.bookings FOR ALL USING (public.is_admin(auth.uid()));

-- DELIVERY ZONES – public read
CREATE POLICY "Anyone can view delivery zones" ON public.delivery_zones FOR SELECT USING (true);
CREATE POLICY "Admins can manage delivery zones" ON public.delivery_zones FOR ALL USING (public.is_admin(auth.uid()));

-- SITE SETTINGS – public read
CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (public.is_admin(auth.uid()));

-- THEME SETTINGS – public read
CREATE POLICY "Anyone can read theme" ON public.theme_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage theme" ON public.theme_settings FOR ALL USING (public.is_admin(auth.uid()));

-- ANALYTICS
CREATE POLICY "Anyone can log analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view analytics" ON public.analytics_events FOR SELECT USING (public.is_admin(auth.uid()));

-- STORAGE POLICIES
CREATE POLICY "Public read products bucket" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "Admins upload products" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins delete products" ON storage.objects FOR DELETE USING (bucket_id = 'products' AND public.is_admin(auth.uid()));

CREATE POLICY "Public read gallery bucket" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Admins upload gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins delete gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

CREATE POLICY "Public read avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public read theme" ON storage.objects FOR SELECT USING (bucket_id = 'theme');
CREATE POLICY "Admins upload theme assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'theme' AND public.is_admin(auth.uid()));

-- ============================================================
-- SEED DEFAULT SITE SETTINGS & DELIVERY ZONES
-- ============================================================
INSERT INTO public.site_settings (key, value) VALUES
  ('store_name', '"Tezzaz Hair & Beauty"'),
  ('store_email', '"booking@tezzaz-hair.com"'),
  ('store_phone', '"+254 711 135 090"'),
  ('store_address', '"The Bazaar, 10th Floor, Wing B, Suite 1025, Nairobi"'),
  ('whatsapp_number', '"254711135090"'),
  ('free_delivery_above', '2000'),
  ('currency', '"KSh"'),
  ('paybill_number', '"899890"')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.delivery_zones (zone_name, areas, fee, free_above, estimated_days) VALUES
  ('Nairobi CBD', ARRAY['CBD', 'Westlands', 'Upper Hill', 'Upperhill', 'Kilimani'], 150, 2000, '1-2'),
  ('Nairobi Suburbs', ARRAY['Lavington', 'Karen', 'Runda', 'Muthaiga', 'Gigiri', 'Parklands', 'Kasarani'], 200, 2500, '1-2'),
  ('Greater Nairobi', ARRAY['Thika Road', 'Kiambu', 'Ruiru', 'Juja', 'Machakos', 'Athi River'], 350, 3000, '2-3'),
  ('Rest of Kenya', ARRAY['Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Other'], 500, 5000, '3-5')
ON CONFLICT DO NOTHING;

-- Default theme
INSERT INTO public.theme_settings (primary_color, accent_color, background_color, font_heading, font_body, hero_text, hero_subtext)
VALUES ('#000000', '#C9A96E', '#FFFFFF', 'Playfair Display', 'Inter', 'Hair, Beauty & Nails', 'Located at The Bazaar, 10th Floor – Nairobi')
ON CONFLICT DO NOTHING;

-- Default categories
INSERT INTO public.categories (name, slug, sort_order) VALUES
  ('All', 'all', 0),
  ('Hair Care', 'hair', 1),
  ('Skin Care', 'skin', 2),
  ('Nail Products', 'nails', 3),
  ('Makeup', 'makeup', 4),
  ('Tools', 'tools', 5)
ON CONFLICT (slug) DO NOTHING;
