import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children} : PrivateRouteProps) {
  const {authorizationStatus} = useAppSelector((state) => state);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to='/login' />
  );
}

export default PrivateRoute;
