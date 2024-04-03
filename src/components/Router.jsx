import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import App from './App';
import LevelsPage from './LevelsPage';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
