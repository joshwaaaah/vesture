import type { Tables } from '@/types/database.types';

import CreateWardrobeItemScreen from '@/app/(tabs)/wardrobe/create';
import { createWrapper } from '@/test-utils/create-wrapper';
import { supabase } from '@/utils/supabase';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest
    .fn()
    .mockReturnValue({ wardrobeId: 'wardrobe-uuid-1' }),
}));

jest.mock('@/providers/auth-providers', () => ({
  useRequiredAuth: jest.fn().mockReturnValue({ user: { id: 'user-uuid-1' } }),
}));

const mockFrom = supabase.from as jest.Mock;
const mockInsert = jest.fn();
const mockInsertSingle = jest.fn();

const taxonomyData: {
  categories: Tables<'categories'>[];
  colors: Tables<'colors'>[];
  sizes: Tables<'sizes'>[];
} = {
  categories: [
    { id: 'parent-1', name: 'Tops', parent_id: null },
    { id: 'parent-2', name: 'Bottoms', parent_id: null },
    { id: 'cat-1', name: 'T-Shirts', parent_id: 'parent-1' },
    { id: 'cat-2', name: 'Shirts', parent_id: 'parent-1' },
    { id: 'cat-3', name: 'Jeans', parent_id: 'parent-2' },
    { id: 'cat-4', name: 'Trousers', parent_id: 'parent-2' },
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

  mockFrom.mockImplementation(
    (table: keyof typeof taxonomyData | 'wardrobe_items') => {
      if (table === 'wardrobe_items') {
        return {
          insert: mockInsert.mockReturnValue({
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
    },
  );

  mockInsertSingle.mockResolvedValue({
    data: { id: 'item-uuid-1' },
    error: null,
  });
});

describe('<CreateWardrobeItemScreen />', () => {
  it('renders a title input and a submit button', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('e.g. Black Jacket')).toBeTruthy();
      expect(screen.getByText('Add item to wardrobe')).toBeTruthy();
    });
  });

  it('shows a loading state while the mutation is in progress', async () => {
    mockInsertSingle.mockReturnValue(new Promise(() => {}));

    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(
      screen.getByPlaceholderText('e.g. Black Jacket'),
      'Black Jacket',
    );
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    fireEvent.press(screen.getByText('Tops'));
    await waitFor(() => expect(screen.getByText('T-Shirts')).toBeTruthy());
    fireEvent.press(screen.getByText('T-Shirts'));

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() =>
      expect(screen.getByTestId('submit-loading')).toBeTruthy(),
    );
  });

  it('shows a validation error when title is empty', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() =>
      expect(screen.getByText('Please enter a title')).toBeTruthy(),
    );
  });

  it('shows a validation error when price is empty', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() =>
      expect(screen.getByText('Please enter a price')).toBeTruthy(),
    );
  });

  it('calls router.back() after a successful submission', async () => {
    const { router } = jest.requireMock('expo-router');

    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(
      screen.getByPlaceholderText('e.g. Black Jacket'),
      'Black Jacket',
    );
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    fireEvent.press(screen.getByText('Tops'));
    await waitFor(() => expect(screen.getByText('T-Shirts')).toBeTruthy());
    fireEvent.press(screen.getByText('T-Shirts'));

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() => expect(router.back).toHaveBeenCalled());
  });

  it('renders parent category options', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    expect(screen.getByText('Bottoms')).toBeTruthy();
  });

  it('does not render subcategory pills until a parent is selected', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());

    expect(screen.queryByText('T-Shirts')).toBeNull();
    expect(screen.queryByText('Jeans')).toBeNull();
  });

  it('renders subcategory pills after selecting a parent', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    fireEvent.press(screen.getByText('Tops'));

    await waitFor(() => expect(screen.getByText('T-Shirts')).toBeTruthy());
    expect(screen.getByText('Shirts')).toBeTruthy();
    expect(screen.queryByText('Jeans')).toBeNull();
  });

  it('shows a validation error when no category is selected', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(
      screen.getByPlaceholderText('e.g. Black Jacket'),
      'Black Jacket',
    );
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');
    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() =>
      expect(screen.getByText('Please select a category')).toBeTruthy(),
    );
  });

  it('shows a validation error when a parent is selected but no subcategory is chosen', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    fireEvent.press(screen.getByText('Tops'));
    await waitFor(() => expect(screen.getByText('T-Shirts')).toBeTruthy());

    fireEvent.changeText(
      screen.getByPlaceholderText('e.g. Black Jacket'),
      'Black Jacket',
    );
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');
    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() =>
      expect(
        screen.getByText('Please select a more specific category'),
      ).toBeTruthy(),
    );
  });

  it('clears the subcategory selection when the parent changes', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    fireEvent.press(screen.getByText('Tops'));
    await waitFor(() => expect(screen.getByText('T-Shirts')).toBeTruthy());
    fireEvent.press(screen.getByText('T-Shirts'));

    fireEvent.press(screen.getByText('Bottoms'));

    await waitFor(() => expect(screen.getByText('Jeans')).toBeTruthy());
    expect(screen.queryByText('T-Shirts')).toBeNull();
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
    await waitFor(() => screen.getByText('Tops'));

    const priceInput = screen.getByPlaceholderText('e.g. 49.99');
    fireEvent.changeText(priceInput, '49.33');

    expect(priceInput.props.value).toBe('49.33');
  });

  it('submits with favourited: true when the switch is toggled on', async () => {
    render(<CreateWardrobeItemScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByPlaceholderText('e.g. Black Jacket'), 'Black Jacket');
    fireEvent.changeText(screen.getByPlaceholderText('e.g. 49.99'), '49.99');

    await waitFor(() => expect(screen.getByText('Tops')).toBeTruthy());
    fireEvent.press(screen.getByText('Tops'));
    await waitFor(() => expect(screen.getByText('T-Shirts')).toBeTruthy());
    fireEvent.press(screen.getByText('T-Shirts'));

    fireEvent(screen.getByTestId('favourited-switch'), 'valueChange', true);

    fireEvent.press(screen.getByText('Add item to wardrobe'));

    await waitFor(() =>
      expect(mockInsert).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ favourited: true }),
        ]),
      ),
    );
  });
});
