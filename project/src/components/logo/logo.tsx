import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  isLinkLight: boolean;
}

export default function Logo({isLinkLight}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={`logo__link ${isLinkLight ? 'logo__link--light' : null}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
