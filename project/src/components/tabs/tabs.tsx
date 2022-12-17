import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCurrentFilm, getComments } from '../../store/current-film-data/selectors';
import { Tab } from '../../const';
import { MovieOverview, MovieDetails, MovieReviews } from '../movieTabs';
import NotFound from '../../pages/notFound/notFound';

function Tabs(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Overview);

  const currentFilm = useAppSelector(getCurrentFilm);
  const comments = useAppSelector(getComments);

  if (!currentFilm) {
    return <NotFound />;
  }

  const {starring, director, description, rating, runTime, scoresCount, genre, released} = currentFilm;

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === Tab.Overview && 'film-nav__item--active'}`}>
            <div className="film-nav__link" onClick={() => setActiveTab(Tab.Overview)}>Overview</div>
          </li>
          <li className={`film-nav__item ${activeTab === Tab.Details && 'film-nav__item--active'}`}>
            <div className="film-nav__link" onClick={() => setActiveTab(Tab.Details)}>Details</div>
          </li>
          <li className={`film-nav__item ${activeTab === Tab.Reviews && 'film-nav__item--active'}`}>
            <div className="film-nav__link" onClick={() => setActiveTab(Tab.Reviews)}>Reviews</div>
          </li>
        </ul>
      </nav>
      { activeTab === Tab.Overview &&
        <MovieOverview
          rating={rating}
          description={description}
          director={director}
          starring={starring}
          scoresCount={scoresCount}
        /> }

      { activeTab === Tab.Details &&
        <MovieDetails
          director={director}
          starring={starring}
          runTime={runTime}
          genre={genre}
          released={released}
        /> }

      { activeTab === Tab.Reviews && <MovieReviews reviews={comments} /> }
    </>
  );
}

export default Tabs;
