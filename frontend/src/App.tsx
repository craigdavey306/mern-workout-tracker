import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          loader: () => (!user ? redirect('/login') : null),
          element: <Home />,
        },
        {
          path: 'login',
          loader: () => (user ? redirect('/') : null),
          element: <Login />,
        },
        {
          path: 'signup',
          loader: () => (user ? redirect('/') : null),
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
