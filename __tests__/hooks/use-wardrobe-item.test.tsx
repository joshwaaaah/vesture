import { renderHook, waitFor } from '@testing-library/react-native';
import { useWardrobeItem, type WardrobeItemWithDetails } from '@/hooks/use-wardrobe-item';
import { NotFoundError } from '@/utils/errors';
import { createWrapper } from '@/test-utils/create-wrapper';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  },
}));

const mockSingle: jest.Mock = jest.requireMock('@/utils/supabase').supabase.single;

const mockItem: WardrobeItemWithDetails = {
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
  category: null,
  color: null,
  size: null,
};

beforeEach(() => jest.clearAllMocks());

describe('useWardrobeItem', () => {
  it('returns item data when Supabase responds successfully', async () => {
    mockSingle.mockResolvedValue({ data: mockItem, error: null });

    const { result } = renderHook(() => useWardrobeItem('uuid-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Black Jacket');
  });

  it('is in a loading state before the query resolves', () => {
    mockSingle.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useWardrobeItem('uuid-1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('returns an error state when Supabase returns an error', async () => {
    mockSingle.mockResolvedValue({ data: null, error: { message: 'Not found' } });

    const { result } = renderHook(() => useWardrobeItem('uuid-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });

  it('returns an error state when data is null and no error is returned', async () => {
    mockSingle.mockResolvedValue({ data: null, error: null });

    const { result } = renderHook(() => useWardrobeItem('uuid-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(NotFoundError);
  });
});
