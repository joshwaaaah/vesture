export type WardrobeItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  favourited?: boolean;
  category?: string;
  color?: string;
  size?: string;
  notes?: string;
};

const WARDROBE_ITEMS: WardrobeItem[] = [
  {
    id: 1,
    title: 'Wool-blend Jacket',
    image:
      'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
    price: 129.99,
    category: 'Outerwear',
    color: 'Navy',
    size: 'M',
    notes: 'Great for cooler evenings and layering.',
  },
  {
    id: 2,
    title: 'Pleated Trousers',
    image:
      'https://images.asos-media.com/products/asos-design-boxy-oversized-polo-with-football-front-print-in-white-and-green/210324365-1-offwhite?$n_960w$&wid=952&fit=constrain',
    price: 79.99,
    category: 'Trousers',
    color: 'Off-white / Green',
    size: '32W',
    notes: 'Pairs well with minimal sneakers.',
  },
  {
    id: 3,
    title: 'Graphic Tees',
    image:
      'https://images.asos-media.com/products/asos-design-boxy-oversized-polo-with-football-front-print-in-white-and-green/210324365-1-offwhite?$n_960w$&wid=952&fit=constrain',
    price: 34.99,
    category: 'Tops',
    color: 'White / Green',
    size: 'L',
  },
  {
    id: 4,
    title: 'Graphic Tee',
    image:
      'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
    price: 29.99,
    favourited: true,
    category: 'Tops',
    color: 'Navy',
    size: 'M',
    notes: 'Favourite everyday tee.',
  },
  {
    id: 5,
    title: 'Graphic Tee',
    image:
      'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
    price: 24.99,
    category: 'Tops',
    color: 'Navy',
    size: 'S',
  },
  {
    id: 6,
    title: 'Graphic Tee',
    image:
      'https://images.asos-media.com/products/asos-design-oversized-cropped-t-shirt-in-blue-with-italy-graphic/208582022-1-truenavy?$n_960w$&wid=952&fit=constrain',
    price: 32.99,
    category: 'Tops',
    color: 'Navy',
    size: 'XL',
  },
];

export function getWardrobeItems(): WardrobeItem[] {
  return WARDROBE_ITEMS;
}

export function getWardrobeItemById(id: number): WardrobeItem | undefined {
  return WARDROBE_ITEMS.find((item) => item.id === id);
}

