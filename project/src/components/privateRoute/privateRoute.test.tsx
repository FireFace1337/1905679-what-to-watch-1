import { Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../historyRouter/historyRouter';
import PrivateRoute from './privateRoute';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../const';

const mockStore = configureMockStore<State>();
const history = createMemoryHistory();

describe('Component: PriveteRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('Should render private page if user is logged in', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Routes>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>It is a Private page</h1>
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Login} element={
              <h1>Login page</h1>
            }
            />
          </Routes>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText(/It is a Private page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login page/i)).not.toBeInTheDocument();
  });

  it('Should render login page if user is not logged in', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Routes>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>It is a Private page</h1>
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Login} element={
              <h1>Login page</h1>
            }
            />
          </Routes>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
    expect(screen.queryByText(/It is a Private page/i)).not.toBeInTheDocument();
  });
});
