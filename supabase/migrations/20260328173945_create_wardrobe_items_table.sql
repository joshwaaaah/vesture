CREATE TABLE public.wardrobe_items (
  id           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  created_at   timestamp with time zone NOT NULL DEFAULT now(),
  updated_at   timestamp with time zone          NULL,
  title        text                     NOT NULL,
  price        numeric                           NULL,
  image_url    text                              NULL,
  favourited   boolean                  NOT NULL DEFAULT false,
  notes        text                              NULL,
  category_id  uuid                              NULL,
  color_id     uuid                              NULL,
  size_id      uuid                              NULL,
  wardrobe_id  uuid                     NOT NULL,
  user_id      uuid                     NOT NULL,

  CONSTRAINT wardrobe_items_pkey
    PRIMARY KEY (id),

  CONSTRAINT wardrobe_items_category_id_fkey
    FOREIGN KEY (category_id) REFERENCES public.categories (id) ON DELETE SET NULL,

  CONSTRAINT wardrobe_items_color_id_fkey
    FOREIGN KEY (color_id) REFERENCES public.colors (id) ON DELETE SET NULL,

  CONSTRAINT wardrobe_items_size_id_fkey
    FOREIGN KEY (size_id) REFERENCES public.sizes (id) ON DELETE SET NULL,

  CONSTRAINT wardrobe_items_wardrobe_id_fkey
    FOREIGN KEY (wardrobe_id) REFERENCES public.wardrobes (id) ON DELETE CASCADE,

  CONSTRAINT wardrobe_items_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wardrobe items"
  ON public.wardrobe_items FOR SELECT TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wardrobe items"
  ON public.wardrobe_items FOR INSERT TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wardrobe items"
  ON public.wardrobe_items FOR UPDATE TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wardrobe items"
  ON public.wardrobe_items FOR DELETE TO public
  USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.wardrobe_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wardrobe_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wardrobe_items TO service_role;
