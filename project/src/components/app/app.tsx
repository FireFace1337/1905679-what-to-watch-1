import { Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import MainContent from '../../pages/mainContent/mainContent';
import NotFound from '../../pages/notFound/notFound';
import SignIn from '../../pages/signIn/signIn';
import MyList from '../../pages/myList/myList';
import MoviePage from '../../pages/moviePage/moviePage';
import AddReview from '../../pages/addReview/addReview';
import Player from '../../pages/player/player';
import PrivateRoute from '../privateRoute/privateRoute';
import { AppRoute } from '../../const';
import ScrollToTop from '../scrollToTop/scrollToTop';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../../pages/loadingScreen/loadingScreen';
import { getMyList } from '../../store/api-actions';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(getMyList());
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={
            <MainContent />
          }
          />
          <Route path={AppRoute.Login} element={ <SignIn /> } />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Films}>
            <Route path=':filmId' element={ <MoviePage /> } />
            <Route path={`:filmId${AppRoute.Review}`} element={
              <PrivateRoute>
                <AddReview />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path={AppRoute.Player}>
            <Route path=':filmId' element={ <Player /> } />
          </Route>
        </Route>
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </>
  );
}

export default App;
