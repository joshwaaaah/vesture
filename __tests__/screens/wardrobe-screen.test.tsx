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

jest.mock('@/hooks/use-default-wardrobe', () => ({
  useDefaultWardrobe: () => ({ data: null }),
}));

jest.mock('@/hooks/use-categories', () => ({ useCategories: () => ({}) }));
jest.mock('@/hooks/use-colors', () => ({ useColors: () => ({}) }));
jest.mock('@/hooks/use-sizes', () => ({ useSizes: () => ({}) }));

const mockFrom = jest.mocked(supabase.from);

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
    seasons: [],
  },
];

function mockQuery(
  data: WardrobeItem[] | null,
  error: { message: string } | null = null,
) {
  mockFrom.mockReturnValue({
    select: jest.fn().mockReturnValue({
      order: jest.fn().mockResolvedValue({ data, error }),
    }),
  });
}

beforeEach(() => jest.clearAllMocks());

describe('<WardrobeScreen />', () => {
  it('renders item titles when data loads', async () => {
    mockQuery(mockItems);

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('White Tee')).toBeTruthy());
  });

  it('shows an empty state when there are no items', async () => {
    mockQuery([]);

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByText('Your wardrobe is empty.')).toBeTruthy(),
    );
  });

  it('shows the correct item count for a single item', async () => {
    mockQuery(mockItems);

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('1 item')).toBeTruthy());
  });

  it('shows the correct item count for multiple items', async () => {
    mockQuery([...mockItems, { ...mockItems[0], id: 'uuid-2' }]);

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('2 items')).toBeTruthy());
  });

  it('shows "0 items" when there are no items', async () => {
    mockQuery([]);

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('0 items')).toBeTruthy());
  });

  it('shows an error state when the query fails', async () => {
    mockQuery(null, { message: 'Database error' });

    render(<WardrobeScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong. Please try again.'),
      ).toBeTruthy(),
    );
  });
});
