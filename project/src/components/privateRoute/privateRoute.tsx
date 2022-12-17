import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children} : PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to='/login' />
  );
}

export default PrivateRoute;
