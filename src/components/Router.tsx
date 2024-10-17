import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  homePageLoader,
  leaderboardPageLoader,
  levelPageLoader,
  levelsPageLoader,
} from '../loaders';
import App from './App';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import LeaderboardPage from './LeaderboardPage';
import LevelPage from './LevelPage';
import LevelsPage from './LevelsPage';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: 'home',
          element: <HomePage />,
          loader: homePageLoader,
        },
        {
          path: 'levels',
          element: <LevelsPage />,
          loader: levelsPageLoader,
        },
        {
          path: 'levels/:id',
          element: <LevelPage />,
          loader: levelPageLoader,
        },
        {
          path: 'leaderboard',
          element: <LeaderboardPage />,
          loader: leaderboardPageLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
