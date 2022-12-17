import { useRef, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import { AuthorizationStatus, AppRoute } from '../../const';
import { loginAction } from '../../store/api-actions';
import { redirect } from '../../store/actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function SignIn() : JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const checkPassword = (password: string): boolean => {
    const reg = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{2,}/;
    const result = reg.test(password);
    result && setIsValidPassword(true);
    return result;
  };

  const checkEmail = (email: string): boolean => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current && passwordRef.current) {
      if (checkPassword(passwordRef.current.value) && checkEmail(emailRef.current.value)) {
        dispatch(loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }));
      }
    }
  };

  const onEmailChange = (): void => {
    if (emailRef.current) {
      if (checkEmail(emailRef.current.value)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    }
  };

  const onPasswordChange = (): void => {
    if (passwordRef.current) {
      if (checkPassword(passwordRef.current.value)) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirect(AppRoute.Main));
    }
  }, [authorizationStatus, dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLinkLight={false} />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action=""
          className="sign-in__form"
          onSubmit={handleSubmit}
        >
          <div className="sign-in__fields">
            <div className={`sign-in__field ${isValidEmail !== false || 'sign-in__field--error'}`}>
              <input
                className="sign-in__input"
                ref={emailRef}
                onChange={() => onEmailChange()}
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            {
              isValidEmail !== false ||
              <div className="sign-in__message">
                Enter a valid email
              </div>
            }
            <div className={`sign-in__field ${isValidPassword !== false || 'sign-in__field--error'}`}>
              <input
                className="sign-in__input"
                ref={passwordRef}
                onChange={() => onPasswordChange()}
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
            {
              isValidPassword !== false ||
              <div className="sign-in__message">
                Password should contain at least one letter and one number
              </div>
            }
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo isLinkLight />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
