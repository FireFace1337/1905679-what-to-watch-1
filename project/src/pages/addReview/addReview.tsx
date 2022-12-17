import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from '../../components/logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCurrentFilm } from '../../store/current-film-data/selectors';
import NotFound from '../notFound/notFound';
import FormReview from '../../components/formReview/formReview';
import LoginBlock from '../../components/loginBlock/loginBlock';
import { fetchFilmById } from '../../store/api-actions';
import { getLoadingStatus } from '../../store/current-film-data/selectors';
import LoadingScreen from '../loadingScreen/loadingScreen';

function AddReview(): JSX.Element {
  const dispatch = useAppDispatch();

  const filmId = String(useParams().filmId);

  const currentFilm = useAppSelector(getCurrentFilm);
  const isLoading = useAppSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchFilmById(filmId));
  }, [dispatch, filmId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentFilm) {
    return <NotFound />;
  }

  const {id, name, posterImage, backgroundImage, backgroundColor} = currentFilm;

  return (
    <section className="film-card film-card--full" style={{'background': backgroundColor}}>
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
                <Link className="breadcrumbs__link" to='#'>Add review</Link>
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
