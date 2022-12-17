import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import HistoryRouter from '../historyRouter/historyRouter';
import PromoFilmCard from './promoFilmCard';
import { makeFakeFilm } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore<State>();
const mockFilm = makeFakeFilm({});

describe('Component: PromoFilmCard', () => {
  it('Should render without mylist button if user is not logged in', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        favoriteFilms: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={createMemoryHistory()}>
          <PromoFilmCard film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    const {name, genre, released} = mockFilm;

    expect(screen.getByTestId('promo_film')).toBeInTheDocument();
    expect(screen.getByAltText(`${name} poster`)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();
    expect(screen.queryByText('My list')).not.toBeInTheDocument();
  });

  it('Should render with mylist button if user is logged in', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        favoriteFilms: [makeFakeFilm({})]
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={createMemoryHistory()}>
          <PromoFilmCard film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    const {name, genre, released} = mockFilm;

    expect(screen.getByTestId('promo_film')).toBeInTheDocument();
    expect(screen.getByAltText(`${name} poster`)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
  });
});
