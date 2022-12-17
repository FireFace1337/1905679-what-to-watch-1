import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import NotFound from '../notFound/notFound';
import FormReview from '../../components/formReview/formReview';
import LoginBlock from '../../components/loginBlock/loginBlock';

function AddReview(): JSX.Element {
  const {listOfFilms} = useAppSelector((state) => state);

  const {filmId} = useParams();
  const film = listOfFilms.find((e) => e.id === Number(filmId));

  if (film === undefined) {
    return <NotFound />;
  }

  const {id, name, posterImage, backgroundImage} = film;

  return (
    <section className="film-card film-card--full" style={{'background': film.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo isLinkLight={false} />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <LoginBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>
      <FormReview />
    </section>
  );
}

export default AddReview;
