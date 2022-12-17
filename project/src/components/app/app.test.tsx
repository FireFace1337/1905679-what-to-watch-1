import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Store } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../historyRouter/historyRouter';
import { State } from '../../types/state';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import { createAPI } from '../../services/api';
import { makeFakeFilm, makeFakeComment, makeFakeUser } from '../../utils/mocks';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockAPI = new MockAdapter(api);

const mockStore = configureMockStore<State>(middlewares);
mockAPI.onAny().reply(200);

const initStore = mockStore({
  USER: {
    user: null,
    authorizationStatus: AuthorizationStatus.NoAuth,
    isLoading: false,
    favoriteFilms: []
  },
  MAIN_PAGE: {
    listOfFilms: [makeFakeFilm({}), makeFakeFilm({})],
    promoFilm: makeFakeFilm({}),
    isLoading: false,
    currentGenre: 'All Genres',
    genres: []
  },
  CURRENT_FILM: {
    isLoading: false,
    film: makeFakeFilm({}),
    comments: [makeFakeComment()],
    similarFilms: [makeFakeFilm({})]
  }
});

const history = createMemoryHistory();

const TestApp = ({store}: {store: Store}) => (
  <HistoryRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </HistoryRouter>
);

window.scrollTo = jest.fn();

describe('App Routing', () => {
  it('Should render MainContent when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(
      <TestApp store={initStore} />
    );

    expect(window.scrollTo).toBeCalled();
    expect(screen.getByTestId('promo_film')).toBeInTheDocument();
    expect(screen.getByTestId('genres')).toBeInTheDocument();
    expect(screen.getAllByTestId('film_card')).toHaveLength(2);
  });

  it('Should render SignIn when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(
      <TestApp store={initStore} />
    );

    expect(window.scrollTo).toBeCalled();
    expect(screen.getByRole('heading').textContent).toEqual('Sign in');
    expect(screen.getByRole('button').textContent).toEqual('Sign in');
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  describe('Navigate to "/mylist"', () => {
    it('Should render MyList when user is logged in', () => {
      history.push(AppRoute.MyList);

      const store = mockStore({
        USER: {
          user: makeFakeUser(),
          authorizationStatus: AuthorizationStatus.Auth,
          isLoading: false,
          favoriteFilms: [makeFakeFilm({})]
        }
      });

      render(
        <TestApp store={store} />
      );

      expect(screen.getByText(/My List/i)).toBeInTheDocument();
    });

    it('Should render SignIn when user is not logged in', () => {
      history.push(AppRoute.MyList);

      render(
        <TestApp store={initStore} />
      );

      expect(screen.getByRole('heading').textContent).toEqual('Sign in');
      expect(screen.getByRole('button').textContent).toEqual('Sign in');
      expect(screen.getByText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password/i)).toBeInTheDocument();
    });
  });

  it('Should render MoviePage when user navigate to "/films/:filmId"', () => {
    history.push(`${AppRoute.Films}/1`);
    render(
      <TestApp store={initStore} />
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  describe('Navigate to "/films/:filmId/review"', () => {
    it('Should render AddReview when user is loggen in', () => {
      history.push(`${AppRoute.Films}/1${AppRoute.Review}`);

      const store = mockStore({
        USER: {
          user: makeFakeUser(),
          authorizationStatus: AuthorizationStatus.Auth,
          isLoading: false,
          favoriteFilms: [makeFakeFilm({})]
        },
        CURRENT_FILM: {
          isLoading: false,
          film: makeFakeFilm({}),
          comments: [makeFakeComment()],
          similarFilms: [makeFakeFilm({})]
        }
      });

      render(
        <TestApp store={store} />
      );

      expect(screen.getByRole('form')).toHaveClass('add-review__form');
      expect(screen.getByRole('button').textContent).toEqual('Post');
      expect(screen.getAllByRole('radio')).toHaveLength(10);
    });

    it('Should render SignIn when user is not logged in', () => {
      history.push(`${AppRoute.Films}/1${AppRoute.Review}`);

      render(
        <TestApp store={initStore} />
      );

      expect(screen.getByRole('heading').textContent).toEqual('Sign in');
      expect(screen.getByRole('button').textContent).toEqual('Sign in');
      expect(screen.getByText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password/i)).toBeInTheDocument();
    });
  });

  it('Should render Player when user navigate to "/player/:filmId"', () => {
    history.push(`${AppRoute.Player}/1`);

    render(
      <TestApp store={initStore} />
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('full_screen')).toBeInTheDocument();
  });
});
