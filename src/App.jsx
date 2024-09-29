import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'cocktail/:id',
        element: <Cocktail />,
        loader: singleCocktailLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        index: true,
        action: newsletterAction,
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
