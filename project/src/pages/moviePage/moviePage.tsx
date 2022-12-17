import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../components/logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import NotFound from '../notFound/notFound';
import Tabs from '../../components/tabs/tabs';
import { AuthorizationStatus, AppRoute, NUMBER_OF_SIMILAR_FILMS } from '../../const';
import ShowMoreButton from '../../components/showMoreButton/showMoreButton';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';
import LoginBlock from '../../components/loginBlock/loginBlock';
import { fetchFilmById, changeFavoriteFilmStatus } from '../../store/api-actions';
import { getSimilarFilms, getCurrentFilm, getLoadingStatus } from '../../store/current-film-data/selectors';
import { getAuthorizationStatus, getFavouriteFilms } from '../../store/user-process/selectors';
import LoadingScreen from '../loadingScreen/loadingScreen';

function MoviePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [numberOfFilms, setNumberOfFilms] = useState<number>(NUMBER_OF_SIMILAR_FILMS);

  const filmId = String(useParams().filmId);

  const currentFilm = useAppSelector(getCurrentFilm);
  const favoriteFilms = useAppSelector(getFavouriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const similarFilms = useAppSelector(getSimilarFilms);
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

  const onMyListButton = () => {
    let status: number;

    if (currentFilm.isFavorite) { status = 0; }
    else { status = 1; }

    dispatch(changeFavoriteFilmStatus({filmId, status}));
  };

  const onPlayButton = () => {
    navigate(`${AppRoute.Player}/${filmId}`);
  };

  const {name, backgroundColor, backgroundImage, genre, released, posterImage} = currentFilm;

  return (
    <>
      <section className="film-card film-card--full" style={{'background': backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo isLinkLight={false} />

            <LoginBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => onPlayButton()}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ?
                    <>
                      <button className="btn btn--list film-card__button" type="button" onClick={() => onMyListButton()}>
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          {
                            currentFilm.isFavorite
                              ? <use xlinkHref="#in-list"></use>
                              : <use xlinkHref="#add"></use>
                          }
                        </svg>
                        <span>My list</span>
                        <span className="film-card__count">{favoriteFilms.length}</span>
                      </button>
                      <Link to={`${AppRoute.Films}/${filmId}${AppRoute.Review}`} className="btn film-card__button">Add review</Link>
                    </>
                    : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <ListOfFilms films={similarFilms.slice(0, numberOfFilms)} />
          </div>

          {
            similarFilms.length > numberOfFilms && <ShowMoreButton onSetNumberOfFilms={setNumberOfFilms} numberOfFilms={NUMBER_OF_SIMILAR_FILMS} />
          }
        </section>

        <footer className="page-footer">
          <Logo isLinkLight />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MoviePage;
