import { renderHook, act, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useToggleFavourite } from '@/hooks/use-toggle-favourite';
import { supabase } from '@/utils/supabase';
import { createWrapper } from '@/test-utils/create-wrapper';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockFrom = supabase.from as jest.Mock;

beforeEach(() => jest.clearAllMocks());

describe('useToggleFavourite', () => {
  it('is in a success state when Supabase resolves without error', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const { result } = renderHook(() => useToggleFavourite('uuid-1'), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(false));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('calls update with favourited: true when current value is false', async () => {
    const mockUpdate = jest.fn().mockReturnValue({
      eq: jest.fn().mockResolvedValue({ error: null }),
    });
    mockFrom.mockReturnValue({ update: mockUpdate });

    const { result } = renderHook(() => useToggleFavourite('uuid-1'), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(false));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockUpdate).toHaveBeenCalledWith({ favourited: true });
  });

  it('calls update with favourited: false when current value is true', async () => {
    const mockUpdate = jest.fn().mockReturnValue({
      eq: jest.fn().mockResolvedValue({ error: null }),
    });
    mockFrom.mockReturnValue({ update: mockUpdate });

    const { result } = renderHook(() => useToggleFavourite('uuid-1'), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(true));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockUpdate).toHaveBeenCalledWith({ favourited: false });
  });

  it('invalidates the wardrobe items list query on success', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    const spy = jest.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useToggleFavourite('uuid-1'), { wrapper });

    act(() => result.current.mutate(false));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ['wardrobe-items'] });
  });

  it('invalidates the wardrobe item detail query on success', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    const spy = jest.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useToggleFavourite('uuid-1'), { wrapper });

    act(() => result.current.mutate(false));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ['wardrobe-items', 'uuid-1'] });
  });

  it('is in an error state when Supabase returns an error', async () => {
    mockFrom.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: { message: 'Database error' } }),
      }),
    });

    const { result } = renderHook(() => useToggleFavourite('uuid-1'), {
      wrapper: createWrapper(),
    });

    act(() => result.current.mutate(false));

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
