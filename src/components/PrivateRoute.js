import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, user } = useAuth();

  const shouldRedirect = !isLoggedIn && !user;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
