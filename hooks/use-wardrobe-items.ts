import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import type { Tables } from '@/types/database.types';

export type WardrobeItem = Tables<'wardrobe_items'>;

export function useWardrobeItems() {
  return useQuery({
    queryKey: ['wardrobe-items'],
    queryFn: async () => {
      const { data, error } = await supabase.from('wardrobe_items').select('*');
      if (error) throw error;
      return data;
    },
  });
}
