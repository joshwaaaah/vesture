import { render, screen, waitFor } from '@testing-library/react-native';
import WardrobeItemDetailScreen from '@/app/(tabs)/wardrobe/[id]';
import { createWrapper } from '@/test-utils/create-wrapper';
import type { WardrobeItemWithDetails } from '@/hooks/use-wardrobe-item';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  },
}));

const mockSingle: jest.Mock =
  jest.requireMock('@/utils/supabase').supabase.single;

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn().mockReturnValue({ id: 'uuid-1' }),
}));

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
  shop_url: null,
  category: null,
  color: null,
  size: null,
};

beforeEach(() => jest.clearAllMocks());

describe('<WardrobeItemDetailScreen />', () => {
  it('renders item details when data is loaded', async () => {
    mockSingle.mockResolvedValue({ data: mockItem, error: null });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Black Jacket')).toBeTruthy());
    expect(screen.getByText('£129.99')).toBeTruthy();
  });

  it('shows an error message when the fetch fails', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: 'Database error' },
    });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong. Please try again.'),
      ).toBeTruthy(),
    );
  });

  it('renders category, color and size names when present', async () => {
    mockSingle.mockResolvedValue({
      data: {
        ...mockItem,
        category: { name: 'Tops' },
        color: { name: 'Black' },
        size: { name: 'M' },
      },
      error: null,
    });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    expect(screen.getByText('Black')).toBeTruthy();
    expect(screen.getByText('M')).toBeTruthy();
  });

  it('renders seasons when present', async () => {
    mockSingle.mockResolvedValue({
      data: { ...mockItem, seasons: ['spring', 'autumn'] },
      error: null,
    });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Season')).toBeTruthy());
    expect(screen.getByText('Spring, Autumn')).toBeTruthy();
  });

  it('shows a placeholder when image_url is null', async () => {
    mockSingle.mockResolvedValue({
      data: { ...mockItem, image_url: null },
      error: null,
    });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByTestId('image-placeholder')).toBeTruthy(),
    );
  });

  it('renders a shop link when shop_url is present', async () => {
    mockSingle.mockResolvedValue({
      data: { ...mockItem, shop_url: 'https://shop.example.com/black-jacket' },
      error: null,
    });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('View in shop')).toBeTruthy());
  });
});
