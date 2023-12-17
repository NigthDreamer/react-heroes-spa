import { Navigate } from 'react-router-dom';
import { DcPage, HeroPage, Heroes, MarvelPage, SearchPage } from '../pages';
import { PrivateRoute } from '../../router/PrivateRoute';

export const HeroesRoutes = {  
  path: 'heroes',
  element: 
  <PrivateRoute>
    <Heroes />
  </PrivateRoute>,
  //loader: HeroesLoader, No se pueden meter hooks en los loaders
  children: [
    //Esta será la ruta por defecto que cargará al acceder al la ruta /
    {
      index: true,
      element: <Navigate to='marvel' replace/>,
    },
    {
      path: 'marvel',
      element: <MarvelPage />,
    },
    {
      path: 'dc',
      element: <DcPage />,
    },
    {
      path: 'search',
      element: <SearchPage />,
    },
    {
      // El id es recibido por el Link como parametro
      path: 'hero/:id',
      element: <HeroPage />,
    },
  ],
}