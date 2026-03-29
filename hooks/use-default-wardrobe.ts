import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

export function useDefaultWardrobe() {
  return useQuery({
    queryKey: ['wardrobes', 'default'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wardrobes')
        .select('id')
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
  });
}
