import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';
import LoginBlock from '../../components/loginBlock/loginBlock';

function MyList(): JSX.Element {
  const {favouriteFilms} = useAppSelector((state) => state);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLinkLight={false} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <LoginBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <ListOfFilms films={favouriteFilms} />
        </div>
      </section>

      <footer className="page-footer">
        <Logo isLinkLight />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
