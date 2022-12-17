import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';

function NotFound() : JSX.Element {
  return (
    <div className="error_404 user-page">
      <header className="page-header user-page__head">
        <Logo isLinkLight={false} />
      </header>

      <div className='user-page__content'>
        <h1 className="page-title">404 Not Found</h1>
        <Link className='not-found-link' to='/'>Перейти на главную</Link>
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

export default NotFound;
