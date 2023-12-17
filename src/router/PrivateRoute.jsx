import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth';

//Al poner el children, definimos este componente como un higher order component
export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  const lastPath = pathname + search;
  localStorage.setItem('lastpath', lastPath);

  return logged ? children : <Navigate to="/login" replace={true} />;
};
