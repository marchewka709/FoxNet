
-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('cash_register', 'printer')),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description_pl TEXT,
  short_description_en TEXT,
  description_pl TEXT,
  description_en TEXT,
  features_pl JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  price TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);

-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin write policies on products
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed placeholders
INSERT INTO public.products (category, name, slug, short_description_pl, short_description_en, description_pl, description_en, features_pl, features_en, price, sort_order) VALUES
('cash_register', 'Posnet Ergo Online', 'posnet-ergo-online',
 'Nowoczesna kasa fiskalna online z ekranem dotykowym.',
 'Modern online fiscal cash register with a touchscreen.',
 'Posnet Ergo Online to niezawodna kasa fiskalna z komunikacją online z Centralnym Repozytorium Kas. Idealna dla małych i średnich punktów sprzedaży.',
 'The Posnet Ergo Online is a reliable fiscal cash register with online communication with the Central Cash Register Repository. Ideal for small and medium-sized retail points.',
 '["Komunikacja online z CRK", "Kolorowy ekran dotykowy", "Wbudowany modem GSM", "Do 15 000 towarów", "Kompaktowa obudowa"]'::jsonb,
 '["Online communication with the Central Repository", "Color touchscreen", "Built-in GSM modem", "Up to 15,000 products", "Compact housing"]'::jsonb,
 'od 1 499 zł', 1),
('cash_register', 'Novitus Nano Online', 'novitus-nano-online',
 'Mobilna kasa fiskalna online w kompaktowej obudowie.',
 'Mobile online fiscal cash register in a compact housing.',
 'Novitus Nano Online to najmniejsza mobilna kasa fiskalna z komunikacją online. Świetne rozwiązanie dla usługodawców w terenie.',
 'The Novitus Nano Online is the smallest mobile online fiscal cash register. A great solution for on-site service providers.',
 '["Waga tylko 480 g", "Bateria do 12h pracy", "WiFi + GSM + Bluetooth", "Szybki wydruk termiczny", "Odporna obudowa"]'::jsonb,
 '["Weighs only 480 g", "Up to 12h battery life", "WiFi + GSM + Bluetooth", "Fast thermal printing", "Durable housing"]'::jsonb,
 'od 1 299 zł', 2);
