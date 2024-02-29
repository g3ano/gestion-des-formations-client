import router, { queryClient } from '@/lib/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fr } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{
      errors: Record<string, unknown>;
    }>;
  }
}

setDefaultOptions({ locale: fr, weekStartsOn: 0 });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
