import Default from '@/components/layout/default';
import Dashboard from '@/pages/dashboard';
import { Employees } from '@/pages/employees';
import { Formations, FormationsCreate } from '@/pages/formations';
import { createBrowserRouter } from 'react-router-dom';

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
            element: <FormationsCreate />,
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
            element: <FormationsCreate />,
          },
        ],
      },
    ],
  },
]);

export default router;
