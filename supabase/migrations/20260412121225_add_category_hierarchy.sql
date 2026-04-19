ALTER TABLE public.categories
  ADD COLUMN parent_id uuid REFERENCES public.categories(id) ON DELETE SET NULL;

DELETE FROM public.categories;

WITH inserted_parents AS (
  INSERT INTO public.categories (name) VALUES
    ('Tops'),
    ('Bottoms'),
    ('Dresses & Jumpsuits'),
    ('Outerwear'),
    ('Footwear'),
    ('Accessories'),
    ('Swimwear'),
    ('Activewear'),
    ('Underwear & Loungewear')
  RETURNING id, name
)
INSERT INTO public.categories (name, parent_id)
SELECT child.name, p.id
FROM (VALUES
  ('T-Shirts',        'Tops'),
  ('Shirts',          'Tops'),
  ('Blouses',         'Tops'),
  ('Polo Shirts',     'Tops'),
  ('Tank Tops',       'Tops'),
  ('Crop Tops',       'Tops'),
  ('Jumpers',         'Tops'),
  ('Cardigans',       'Tops'),
  ('Hoodies',         'Tops'),
  ('Sweatshirts',     'Tops'),
  ('Trousers',        'Bottoms'),
  ('Jeans',           'Bottoms'),
  ('Shorts',          'Bottoms'),
  ('Skirts',          'Bottoms'),
  ('Leggings',        'Bottoms'),
  ('Dresses',         'Dresses & Jumpsuits'),
  ('Jumpsuits',       'Dresses & Jumpsuits'),
  ('Playsuits',       'Dresses & Jumpsuits'),
  ('Coats',           'Outerwear'),
  ('Jackets',         'Outerwear'),
  ('Blazers',         'Outerwear'),
  ('Gilets',          'Outerwear'),
  ('Raincoats',       'Outerwear'),
  ('Trainers',        'Footwear'),
  ('Boots',           'Footwear'),
  ('Heels',           'Footwear'),
  ('Flats',           'Footwear'),
  ('Sandals',         'Footwear'),
  ('Loafers',         'Footwear'),
  ('Formal Shoes',    'Footwear'),
  ('Bags',            'Accessories'),
  ('Jewellery',       'Accessories'),
  ('Hats',            'Accessories'),
  ('Scarves',         'Accessories'),
  ('Belts',           'Accessories'),
  ('Sunglasses',      'Accessories'),
  ('Watches',         'Accessories'),
  ('Gloves',          'Accessories'),
  ('Swimsuits',       'Swimwear'),
  ('Bikinis',         'Swimwear'),
  ('Swim Shorts',     'Swimwear'),
  ('Sports Tops',     'Activewear'),
  ('Sports Bras',     'Activewear'),
  ('Underwear',       'Underwear & Loungewear'),
  ('Pyjamas',         'Underwear & Loungewear'),
  ('Loungewear',      'Underwear & Loungewear')
) AS child(name, parent_name)
JOIN inserted_parents p ON p.name = child.parent_name;
