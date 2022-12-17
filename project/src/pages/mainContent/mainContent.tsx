import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks';
import { getPromoFilm, getLoadingStatus } from '../../store/main-data/selectors';
import { fetchFilms } from '../../store/api-actions';
import PromoFilmCard from '../../components/promoFilmCard/promoFilmCard';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';
import Logo from '../../components/logo/logo';
import ListOfGenres from '../../components/ListOfGenres/ListOfGenres';
import ShowMoreButton from '../../components/showMoreButton/showMoreButton';
import LoginBlock from '../../components/loginBlock/loginBlock';
import { NUMBER_OF_FILMS } from '../../const';
import LoadingScreen from '../loadingScreen/loadingScreen';
import { filterFilmsByGenre } from '../../store/main-data/selectors';

function MainContent(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const [numberOfFilms, setNumberOfFilms] = useState(NUMBER_OF_FILMS);

  const promoFilm = useAppSelector(getPromoFilm);
  const isLoading = useAppSelector(getLoadingStatus);

  const filteredFilms = useAppSelector(filterFilmsByGenre);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

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

          <ListOfGenres onSetNumberOfFilms={setNumberOfFilms} />

          <div className="catalog__films-list">
            <ListOfFilms films={filteredFilms.slice(0, numberOfFilms)} />
          </div>

          {
            filteredFilms.length > numberOfFilms && <ShowMoreButton onSetNumberOfFilms={setNumberOfFilms} numberOfFilms={NUMBER_OF_FILMS} />
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
