import Default from '@/components/layout/default';
import Dashboard from '@/pages/dashboard';
import Formations from '@/pages/formations';
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
        element: <Formations />,
      },
    ],
  },
]);

export default router;
