import { QueryClient, QueryClientProvider, notifyManager } from '@tanstack/react-query';
import { ReactNode } from 'react';

notifyManager.setScheduler(fn => fn());

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
