import { render, screen, waitFor } from '@testing-library/react-native';
import WardrobeScreen from '@/app/(tabs)/wardrobe/index';
import { createWrapper } from '@/test-utils/create-wrapper';
import { supabase } from '@/utils/supabase';
import type { WardrobeItem } from '@/hooks/use-wardrobe-items';

jest.mock('@/utils/supabase', () => ({
  supabase: { from: jest.fn() },
}));

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}));

const mockFrom = supabase.from;

const mockItems: WardrobeItem[] = [
  {
    id: 'uuid-1',
    title: 'White Tee',
    price: 29.99,
    image_url: null,
    favourited: false,
    notes: null,
    category_id: null,
    color_id: null,
    size_id: null,
    wardrobe_id: 'wardrobe-uuid-1',
    user_id: 'user-uuid-1',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: null,
  },
];

beforeEach(() => jest.clearAllMocks());

describe('<WardrobeScreen />', () => {
  it('renders item titles when data loads', async () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockItems, error: null }),
    });

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('White Tee')).toBeTruthy());
  });

  it('shows an empty state when there are no items', async () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    });

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByText('Your wardrobe is empty.')).toBeTruthy(),
    );
  });

  it('shows an error state when the query fails', async () => {
    mockFrom.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      }),
    });

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong. Please try again.'),
      ).toBeTruthy(),
    );
  });
});
