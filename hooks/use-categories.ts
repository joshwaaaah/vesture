import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, name, parent_id');
      if (error) throw error;
      return data;
    },
  });
}
