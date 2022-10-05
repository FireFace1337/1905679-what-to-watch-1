import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import AddReview from '../../pages/add-review-page/add-review-page';
import Film from '../../pages/film-page/film-page';
import MyList from '../../pages/my-list-page/my-list-page';
import Player from '../../pages/player-page/player-page';
import SignIn from '../../pages/sign-in-page/sign-in-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';


type mainInfo = {
  year: number;
  genre: string;
  title: string;
}

function App({year, genre, title}: mainInfo): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage mainInfo = {{year, genre, title}} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />
        <Route
          path={AppRoute.Film}
          element={<Film />}
        />
        <Route
          path={AppRoute.MyList}
          element={<MyList />}
        />
        <Route
          path={AppRoute.Player}
          element={<Player />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
