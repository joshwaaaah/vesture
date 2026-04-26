import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import WardrobeItemDetailScreen from '@/app/(tabs)/wardrobe/[id]';
import { createWrapper } from '@/test-utils/create-wrapper';
import type { WardrobeItemWithDetails } from '@/hooks/use-wardrobe-item';
import { useDeleteWardrobeItem } from '@/hooks/use-delete-wardrobe-item';

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

jest.mock('@/hooks/use-delete-wardrobe-item');

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

const mockMutate = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest
    .mocked(useDeleteWardrobeItem)
    // Partial mock to avoid type errors. I can't be bothered typing the entire thing properly.
    .mockReturnValue({ mutate: mockMutate } as unknown as ReturnType<
      typeof useDeleteWardrobeItem
    >);
});

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

  it('renders a delete button when the item is loaded', async () => {
    mockSingle.mockResolvedValue({ data: mockItem, error: null });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Delete item' })).toBeTruthy(),
    );
  });

  it('shows a confirmation alert when the delete button is pressed', async () => {
    mockSingle.mockResolvedValue({ data: mockItem, error: null });
    const alertSpy = jest.spyOn(Alert, 'alert');

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Delete item' })).toBeTruthy(),
    );
    fireEvent.press(screen.getByRole('button', { name: 'Delete item' }));

    expect(alertSpy).toHaveBeenCalledWith(
      'Delete item',
      'Are you sure you want to delete this item?',
      expect.any(Array),
    );
  });

  it('navigates back after confirming deletion', async () => {
    mockSingle.mockResolvedValue({ data: mockItem, error: null });
    const { router } = jest.requireMock('expo-router');

    jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons) => {
      const confirm = buttons?.find((b) => b.style === 'destructive');
      confirm?.onPress?.();
    });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Delete item' })).toBeTruthy(),
    );
    fireEvent.press(screen.getByRole('button', { name: 'Delete item' }));

    // Capture the onSuccess callback passed to mutate and invoke it
    const [, callbacks] = mockMutate.mock.calls[0];
    callbacks.onSuccess();

    expect(router.back).toHaveBeenCalled();
  });

  it('shows an error alert when deletion fails', async () => {
    mockSingle.mockResolvedValue({ data: mockItem, error: null });
    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementationOnce((_title, _msg, buttons) => {
        const confirm = buttons?.find((b) => b.style === 'destructive');
        confirm?.onPress?.();
      });

    render(<WardrobeItemDetailScreen />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Delete item' })).toBeTruthy(),
    );
    fireEvent.press(screen.getByRole('button', { name: 'Delete item' }));

    const [, callbacks] = mockMutate.mock.calls[0];
    callbacks.onError(new Error('Delete failed'));

    expect(alertSpy).toHaveBeenCalledWith('Error', 'Delete failed');
  });
});
