import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

export function useSizes() {
  return useQuery({
    queryKey: ['sizes'],
    queryFn: async () => {
      const { data, error } = await supabase.from('sizes').select('id, name');
      if (error) throw error;
      return data;
    },
  });
}
