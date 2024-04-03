import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import App from './App';
import LevelsPage from './LevelsPage';
import LevelPage from './LevelPage';

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
        },
        {
          path: 'levels',
          element: <LevelsPage />,
        },
        {
          path: 'levels/:id',
          element: <LevelPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
