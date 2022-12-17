import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function LoginBlock(): JSX.Element {
  const {authorizationStatus, user} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth && user !== null ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={AppRoute.Login} className="user-block__link" onClick={() => dispatch(logoutAction())}>Sign out</Link>
            </li>
          </>
          :
          <li className="user-block__item">
            <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
          </li>
      }
    </ul>
  );
}

export default LoginBlock;
