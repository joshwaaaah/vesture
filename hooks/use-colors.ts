import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

export function useColors() {
  return useQuery({
    queryKey: ['colors'],
    queryFn: async () => {
      const { data, error } = await supabase.from('colors').select('id, name');
      if (error) throw error;
      return data;
    },
  });
}
