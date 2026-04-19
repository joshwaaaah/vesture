import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useCreateWardrobeItem } from '@/hooks/use-create-wardrobe-item';
import { supabase } from '@/utils/supabase';
import { createWrapper } from '@/test-utils/create-wrapper';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockFrom = supabase.from as jest.Mock;

const payload = {
  title: 'Black Jacket',
  price: 129.99,
  notes: null,
  favourited: false,
  category_id: null,
  color_id: null,
  size_id: null,
  wardrobe_id: 'wardrobe-uuid-1',
  user_id: 'user-uuid-1',
};

beforeEach(() => jest.clearAllMocks());

describe('useCreateWardrobeItem', () => {
  it('is in a success state when Supabase insert resolves without error', async () => {
    mockFrom.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: { id: 'uuid-1', ...payload }, error: null }),
        }),
      }),
    });

    const { result } = renderHook(() => useCreateWardrobeItem(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(payload));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('is in an error state when Supabase returns an error', async () => {
    mockFrom.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
        }),
      }),
    });

    const { result } = renderHook(() => useCreateWardrobeItem(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(payload));

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
