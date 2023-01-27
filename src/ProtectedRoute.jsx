import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { useDecodeToken } from './hooks/useDecodeToken';

const ProtectedRoute = ({
  children,
  isAdminRoute = false,
  redirectPath = '/',
}) => {
  const { user } = useContext(UserContext);
  const { isAdmin } = useDecodeToken();
  if (!user.token) {
    return <Navigate to={redirectPath} />;
  }

  if (isAdminRoute && user.token) {
    if (isAdmin) {
      console.log('Admin oikeudet, teretulemast!');
      return children;
    } else {
      console.log('Ei admin oikeuksia!');
      return <Navigate to={redirectPath} />;
    }
  }

  return children;
};

export default ProtectedRoute;
