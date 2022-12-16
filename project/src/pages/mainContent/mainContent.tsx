import { useAppSelector } from '../../hooks';
import PromoFilmCard from '../../components/promoFilmCard/promoFilmCard';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';
import { Film } from '../../types/films';
import { Promo } from '../../types/promo';
import Logo from '../../components/logo/logo';
import ListOfGenres from '../../components/ListOfGenres/ListOfGenres';

type MainContentProps = {
  films: Film[];
  promoFilm: Promo;
}

function MainContent({films, promoFilm}: MainContentProps): JSX.Element {
  const {backgroundImage, name} = promoFilm;
  const currentGenre = useAppSelector((state) => state.genre);
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
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
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <PromoFilmCard
          film={promoFilm}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ListOfGenres currentGenre={currentGenre} />

          <div className="catalog__films-list">
            <ListOfFilms films={films} />
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
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

export default MainContent;
