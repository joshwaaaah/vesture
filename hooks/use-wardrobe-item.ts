import { QueryData } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

const buildQuery = (id: string) =>
  supabase
    .from('wardrobe_items')
    .select('*, category:categories(name), color:colors(name), size:sizes(name)')
    .eq('id', id)
    .single();

export type WardrobeItemWithDetails = QueryData<ReturnType<typeof buildQuery>>;

export function useWardrobeItem(id: string | undefined) {
  return useQuery({
    queryKey: ['wardrobe-items', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await buildQuery(id!);
      if (error) throw error;
      if (!data) throw new Error('Item not found');
      return data;
    },
  });
}
