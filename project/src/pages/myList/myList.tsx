import { useEffect } from 'react';
import Logo from '../../components/logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import ListOfFilms from '../../components/listOfFilms/listOfFilms';
import LoginBlock from '../../components/loginBlock/loginBlock';
import { getLoadingStatus, getFavouriteFilms } from '../../store/user-process/selectors';
import { getMyList } from '../../store/api-actions';
import LoadingScreen from '../loadingScreen/loadingScreen';

function MyList(): JSX.Element {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getLoadingStatus);
  const favouriteFilms = useAppSelector(getFavouriteFilms);
  const filmCount = favouriteFilms.length;

  useEffect(() => {
    dispatch(getMyList());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLinkLight={false} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmCount}</span></h1>
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
