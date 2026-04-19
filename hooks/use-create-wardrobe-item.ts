import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import type { TablesInsert } from '@/types/database.types';

export function useCreateWardrobeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TablesInsert<'wardrobe_items'>) => {
      const { data, error } = await supabase
        .from('wardrobe_items')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wardrobe-items'],
      });
    },
  });
}
