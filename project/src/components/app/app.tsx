import MainContent from '../../pages/mainContent/mainContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../notFound/notFound';
import SignIn from '../../pages/signIn/signIn';
import MyList from '../../pages/myList/myList';
import MoviePage from '../../pages/moviePage/moviePage';
import AddReview from '../../pages/addReview/addReview';
import Player from '../../pages/player/player';
import PrivateRoute from '../privateRoute/privateRoute';
import { Film } from '../../types/films';
import { Promo } from '../../types/promo';
import { AppRoute, AuthorizationStatus } from '../../const';
import ScrollToTop from '../scrollToTop/scrollToTop';

type AppProps = {
  films: Film[];
  promoFilm: Promo;
  favouriteFilms: Film[];
}

function App(props: AppProps): JSX.Element {
  const {films, promoFilm, favouriteFilms} = props;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/'>
          <Route index element={
            <MainContent
              films={films}
              promoFilm={promoFilm}
            />
          }
          />
          <Route path={AppRoute.Login} element={ <SignIn /> } />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyList favouriteFilms={favouriteFilms} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Films}>
            <Route path=':filmId' element={ <MoviePage films={films} /> } />
            <Route path={`:filmId${AppRoute.Review}`} element={ <AddReview films={films} /> } />
          </Route>
          <Route path={AppRoute.Player}>
            <Route path=':filmId' element={ <Player /> } />
          </Route>
        </Route>
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
