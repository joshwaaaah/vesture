import { render, screen, waitFor, fireEvent, act } from '@testing-library/react-native';
import CreateWardrobeItemScreen from '@/app/(tabs)/wardrobe/create';
import { supabase } from '@/utils/supabase';
import { createWrapper } from '@/test-utils/create-wrapper';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn().mockReturnValue({ wardrobeId: 'wardrobe-uuid-1' }),
}));

jest.mock('@/providers/auth-providers', () => ({
  useRequiredAuth: jest.fn().mockReturnValue({ user: { id: 'user-uuid-1' } }),
}));

const mockFrom = supabase.from as jest.Mock;
const mockInsertSingle = jest.fn();

const taxonomyData: Record<string, { id: string; name: string }[]> = {
  categories: [
    { id: 'cat-1', name: 'Tops' },
    { id: 'cat-2', name: 'Trousers' },
  ],
  colors: [
    { id: 'col-1', name: 'Black' },
    { id: 'col-2', name: 'White' },
  ],
  sizes: [
    { id: 'size-1', name: 'S' },
    { id: 'size-2', name: 'M' },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();

  mockFrom.mockImplementation((table: string) => {
    if (table === 'wardrobe_items') {
      return {
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockInsertSingle,
          }),
        }),
      };
    }
    return {
      select: jest.fn().mockResolvedValue({
        data: taxonomyData[table] ?? [],
        error: null,
      }),
    };
  });

  mockInsertSingle.mockResolvedValue({ data: { id: 'item-uuid-1' }, error: null });
});

describe('<CreateWardrobeItemScreen />', () => {
  it('renders a title input and a submit button', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });
    await act(async () => {});

    expect(screen.getByPlaceholderText('e.g. Black Jacket')).toBeTruthy();
    expect(screen.getByText('Add item to wardrobe')).toBeTruthy();
  });

  it('shows a loading state while the mutation is in progress', async () => {
    mockInsertSingle.mockReturnValue(new Promise(() => {}));

    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByPlaceholderText('e.g. Black Jacket'), 'Black Jacket');
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');
    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() => expect(screen.getByTestId('submit-loading')).toBeTruthy());
  });

  it('shows a validation error when title is empty', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() => expect(screen.getByText('Please enter a title')).toBeTruthy());
  });

  it('shows a validation error when price is empty', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() => expect(screen.getByText('Please enter a price')).toBeTruthy());
  });

  it('calls router.back() after a successful submission', async () => {
    const { router } = jest.requireMock('expo-router');

    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByPlaceholderText('e.g. Black Jacket'), 'Black Jacket');
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');
    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() => expect(router.back).toHaveBeenCalled());
  });

  it('renders category options', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    expect(screen.getByText('Trousers')).toBeTruthy();
  });

  it('renders color options', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Black')).toBeTruthy());
    expect(screen.getByText('White')).toBeTruthy();
  });

  it('renders size options', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('S')).toBeTruthy());
    expect(screen.getByText('M')).toBeTruthy();
  });

  it('preserves a decimal point while typing in the price field', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });
    await act(async () => {});

    const priceInput = screen.getByPlaceholderText('e.g. 49.99');
    fireEvent.changeText(priceInput, '49.');

    expect(priceInput.props.value).toBe('49.');
  });
});
