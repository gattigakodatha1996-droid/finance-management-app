import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Insights } from './pages/Insights';
import { Profile } from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'transactions',
        Component: Transactions,
      },
      {
        path: 'insights',
        Component: Insights,
      },
      {
        path: 'profile',
        Component: Profile,
      },
    ],
  },
]);