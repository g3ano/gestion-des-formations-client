import { Default } from '@/components/layout/default';
import { Dashboard } from '@/pages/dashboard';
import { Employees } from '@/pages/employee';
import { EmployeeCreate } from '@/pages/employee/create';
import ErrorPage from '@/pages/error/error';
import { Formations, FormationCreate, FormationEdit } from '@/pages/formation';
import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Default />,
    errorElement: <ErrorPage />,
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
            element: <EmployeeCreate />,
          },
        ],
      },
    ],
  },
]);

export default router;
