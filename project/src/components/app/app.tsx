import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import MainContent from '../../pages/mainContent/mainContent';
import NotFound from '../../pages/notFound/notFound';
import SignIn from '../../pages/signIn/signIn';
import MyList from '../../pages/myList/myList';
import MoviePage from '../../pages/moviePage/moviePage';
import AddReview from '../../pages/addReview/addReview';
import Player from '../../pages/player/player';
import PrivateRoute from '../privateRoute/privateRoute';
import { AppRoute, AuthorizationStatus } from '../../const';
import ScrollToTop from '../scrollToTop/scrollToTop';
import LoadingScreen from '../../pages/loadingScreen/loadingScreen';

function App(): JSX.Element {
  const {listOfFilms, promoFilm, favouriteFilms, isLoading} = useAppSelector((state) => state);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/'>
          <Route index element={
            <MainContent
              films={listOfFilms}
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
            <Route path=':filmId' element={ <MoviePage films={listOfFilms} /> } />
            <Route path={`:filmId${AppRoute.Review}`} element={ <AddReview films={listOfFilms} /> } />
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
