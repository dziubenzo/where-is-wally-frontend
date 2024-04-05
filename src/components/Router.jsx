import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import App from './App';
import LevelsPage from './LevelsPage';
import LevelPage from './LevelPage';
import LeaderboardPage from './LeaderboardPage';
import { homePageLoader, levelsPageLoader } from '../loaders';

function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: (
        <App>
          <ErrorPage />
        </App>
      ),
      children: [
        {
          path: '/',
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
        },
        {
          path: 'leaderboard',
          element: <LeaderboardPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
