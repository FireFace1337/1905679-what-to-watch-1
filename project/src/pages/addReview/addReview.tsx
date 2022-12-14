import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { Film } from '../../types/films';
import NotFound from '../../components/notFound/notFound';
import FormReview from '../../components/formReview/formReview';

type AddReviewProps = {
  films: Film[]
};

function AddReview({films}: AddReviewProps): JSX.Element {
  const {filmId} = useParams();
  const film = films.find((e) => e.id === Number(filmId));

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

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
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
