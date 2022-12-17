import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import PromoFilmCard from '../../components/promoFilmCard/promoFilmCard';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';
import Logo from '../../components/logo/logo';
import ListOfGenres from '../../components/listOfGenres/ListOfGenres';
import ShowMoreButton from '../../components/showMoreButton/showMoreButton';
import LoginBlock from '../../components/loginBlock/loginBlock';
import { NUMBER_OF_FILMS } from '../../const';

function MainContent(): JSX.Element | null {
  const [numberOfFilms, setNumberOfFilms] = useState(NUMBER_OF_FILMS);
  const {genre, listOfFilms, promoFilm} = useAppSelector((state) => state);

  if (!promoFilm) {
    return null;
  }

  const {backgroundImage, name} = promoFilm;
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo isLinkLight={false} />

          <LoginBlock />
        </header>

        <PromoFilmCard
          film={promoFilm}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ListOfGenres currentGenre={genre} onSetNumberOfFilms={setNumberOfFilms} />

          <div className="catalog__films-list">
            <ListOfFilms films={listOfFilms.slice(0, numberOfFilms)} />
          </div>

          {
            listOfFilms.length > numberOfFilms && <ShowMoreButton onSetNumberOfFilms={setNumberOfFilms} />
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

export default MainContent;
