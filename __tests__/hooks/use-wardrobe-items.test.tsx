import { renderHook, waitFor } from '@testing-library/react-native';
import {
  useWardrobeItems,
  type WardrobeItem,
} from '@/hooks/use-wardrobe-items';
import { createWrapper } from '@/test-utils/create-wrapper';
import { supabase } from '@/utils/supabase';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockFrom = jest.mocked(supabase.from);

const mockItems: WardrobeItem[] = [
  {
    id: 'uuid-1',
    title: 'Black Jacket',
    price: 129.99,
    image_url: 'https://example.com/jacket.jpg',
    favourited: false,
    notes: null,
    category_id: null,
    color_id: null,
    size_id: null,
    wardrobe_id: 'wardrobe-uuid-1',
    user_id: 'user-uuid-1',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: null,
    seasons: [],
  },
  {
    id: 'uuid-2',
    title: 'White Tee',
    price: 29.99,
    image_url: null,
    favourited: true,
    notes: 'Great staple',
    category_id: null,
    color_id: null,
    size_id: null,
    wardrobe_id: 'wardrobe-uuid-1',
    user_id: 'user-uuid-1',
    created_at: '2026-01-02T00:00:00Z',
    updated_at: null,
    seasons: [],
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useWardrobeItems', () => {
  it('returns items when Supabase responds with data', async () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockResolvedValue({ data: mockItems, error: null }),
      }),
    });

    const { result } = renderHook(() => useWardrobeItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].title).toBe('Black Jacket');
    expect(result.current.data?.[1].title).toBe('White Tee');
  });

  it('is in a loading state before the query resolves', () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockReturnValue(new Promise(() => {})),
      }),
    });

    const { result } = renderHook(() => useWardrobeItems(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('returns an error state when Supabase returns an error', async () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
      }),
    });

    const { result } = renderHook(() => useWardrobeItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });

  it('returns an empty array when the user has no items', async () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockResolvedValue({ data: [], error: null }),
      }),
    });

    const { result } = renderHook(() => useWardrobeItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });

  it('requests items ordered by created_at descending', async () => {
    const mockOrder = jest.fn().mockResolvedValue({ data: mockItems, error: null });
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({ order: mockOrder }),
    });

    renderHook(() => useWardrobeItems(), { wrapper: createWrapper() });

    await waitFor(() => expect(mockOrder).toHaveBeenCalled());
    expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });
  });
});
