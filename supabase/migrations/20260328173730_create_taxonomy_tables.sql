-- Categories
CREATE TABLE public.categories (
  id    uuid NOT NULL DEFAULT gen_random_uuid(),
  name  text NOT NULL,
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_name_key UNIQUE (name)
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT TO public
  USING (true);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;

INSERT INTO public.categories (name) VALUES
  ('Tops'), ('Trousers'), ('Shorts'), ('Dresses'), ('Skirts'),
  ('Outerwear'), ('Footwear'), ('Accessories'), ('Knitwear'), ('Swimwear');


-- Colors
CREATE TABLE public.colors (
  id    uuid NOT NULL DEFAULT gen_random_uuid(),
  name  text NOT NULL,
  CONSTRAINT colors_pkey PRIMARY KEY (id),
  CONSTRAINT colors_name_key UNIQUE (name)
);

ALTER TABLE public.colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view colors"
  ON public.colors FOR SELECT TO public
  USING (true);

GRANT SELECT ON public.colors TO anon, authenticated;
GRANT ALL ON public.colors TO service_role;

INSERT INTO public.colors (name) VALUES
  ('Black'), ('White'), ('Grey'), ('Navy'), ('Blue'),
  ('Red'), ('Green'), ('Yellow'), ('Orange'), ('Pink'),
  ('Purple'), ('Brown'), ('Beige'), ('Cream');


-- Sizes
CREATE TABLE public.sizes (
  id    uuid NOT NULL DEFAULT gen_random_uuid(),
  name  text NOT NULL,
  CONSTRAINT sizes_pkey PRIMARY KEY (id),
  CONSTRAINT sizes_name_key UNIQUE (name)
);

ALTER TABLE public.sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sizes"
  ON public.sizes FOR SELECT TO public
  USING (true);

GRANT SELECT ON public.sizes TO anon, authenticated;
GRANT ALL ON public.sizes TO service_role;

INSERT INTO public.sizes (name) VALUES
  ('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL');
