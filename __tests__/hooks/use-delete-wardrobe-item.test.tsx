import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useDeleteWardrobeItem } from '@/hooks/use-delete-wardrobe-item';
import { supabase } from '@/utils/supabase';
import { createWrapper } from '@/test-utils/create-wrapper';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockFrom = supabase.from as jest.Mock;

beforeEach(() => jest.clearAllMocks());

describe('useDeleteWardrobeItem', () => {
  it('is in a success state when Supabase delete resolves without error', async () => {
    mockFrom.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const { result } = renderHook(() => useDeleteWardrobeItem(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate('uuid-1'));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('is in an error state when Supabase returns an error', async () => {
    mockFrom.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: { message: 'Database error' } }),
      }),
    });

    const { result } = renderHook(() => useDeleteWardrobeItem(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate('uuid-1'));

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
