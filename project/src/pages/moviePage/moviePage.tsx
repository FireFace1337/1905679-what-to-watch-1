import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../components/logo/logo';
import { Film } from '../../types/films';
import NotFound from '../../components/notFound/notFound';
import Tabs from '../../components/tabs/tabs';
import { Tab } from '../../const';
import { comments } from '../../mocks/comments';
import { MovieOverview, MovieDetails, MovieReviews } from '../../components/movieTabs';
import { similarFilms } from '../../mocks/similarFilms';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';

type MoviePageProps = {
  films: Film[];
};

function MoviePage({films}: MoviePageProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(Tab.Overview);

  const {filmId} = useParams();
  const film = films.find((e) => e.id === Number(filmId));

  if (film === undefined) {
    return <NotFound />;
  }

  const onTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section className="film-card film-card--full" style={{'background': film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo isLinkLight={false} />

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a href='/' className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to='review' className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs onTab={onTab} activeTab={activeTab} />

              {activeTab === Tab.Overview &&
                <MovieOverview
                  rating={film.rating}
                  description={film.description}
                  director={film.director}
                  starring={film.starring}
                />}

              {activeTab === Tab.Details &&
                <MovieDetails
                  director={film.director}
                  starring={film.starring}
                  runTime={film.runTime}
                  genre={film.genre}
                  released={film.released}
                />}

              {activeTab === Tab.Reviews && <MovieReviews reviews={comments} />}

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <ListOfFilms films={similarFilms} />
          </div>
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
