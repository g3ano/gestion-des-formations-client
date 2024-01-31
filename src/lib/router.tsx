import { Default } from '@/components/layout/default';
import { Dashboard } from '@/pages/dashboard';
import { Employees } from '@/pages/employee';
import { Formations, FormationCreate, FormationEdit } from '@/pages/formation';
import { loader as formationEditLoader } from '@/pages/formation/edit/edit';
import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/formations',
        children: [
          {
            path: '/formations/',
            element: <Formations />,
          },
          {
            path: '/formations/create',
            element: <FormationCreate />,
          },
          {
            path: '/formations/:formationId/edit',
            element: <FormationEdit />,
            loader: formationEditLoader(queryClient),
          },
        ],
      },
      {
        path: '/employees',
        children: [
          {
            path: '/employees',
            element: <Employees />,
          },
          {
            path: '/employees/create',
            element: <FormationCreate />,
          },
        ],
      },
    ],
  },
]);

export default router;
