import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

export function useToggleFavourite(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (currentFavourited: boolean) => {
      const { error } = await supabase
        .from('wardrobe_items')
        .update({ favourited: !currentFavourited })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wardrobe-items'] });
      queryClient.invalidateQueries({ queryKey: ['wardrobe-items', id] });
    },
  });
}
