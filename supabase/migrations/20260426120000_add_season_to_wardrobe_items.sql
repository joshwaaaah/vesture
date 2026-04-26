CREATE TYPE season AS ENUM ('spring', 'summer', 'autumn', 'winter');

ALTER TABLE wardrobe_items
  ADD COLUMN seasons season[] NOT NULL DEFAULT '{}';
