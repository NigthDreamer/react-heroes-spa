import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { RootPage, ErrorPage } from '../ui';

import { HeroesRoutes } from '../heroes/routes/HeroesRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

/**
 * El BrowseRouter antiguo ha sido deprecado. De ahora en adelante, en el proyecto se usará
 * el nuevo RouterProvider
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    /**
     * Con poner el error page en el root vale para toda la aplicacion. En caso de querer
     * ponerlo tambien en los hijos, se debe de crear un erroPage especifico para cada uno
     * de ellos, puesto que entrará que se mostrará éste en vez del princi
     */
    errorElement: <ErrorPage/>, 
    children: [
      {
        index: true,
        element: <Navigate to='login' replace/>,
      },
      AuthRoutes,
      HeroesRoutes,
    ]
  }
]);

/**
 * El BrowseRouter antiguo ha sido deprecado. De ahora en adelante, en el proyecto se usará
 * el nuevo RouterProvider a traves del createBrowserRouter
 */
// const router = createBrowserRouter(
//   /**
//    * Otra forma de hacerlo, esta a traves de los elementos en vez de un array
//    */
//   createRoutesFromElements(
//     <>
//       <Route path="*" element={<LoginPage />} />
//       <Route path="login" element={<LoginPage />} />
//       <Route path="/" element={<Root />}>
//         <Route path="marvel" element={<MarvelPage />} />
//         <Route path="dc" element={<DcPage />} />
//       </Route>
//     </>
//   )
// );

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
