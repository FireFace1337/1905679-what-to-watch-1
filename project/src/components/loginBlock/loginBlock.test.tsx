
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../historyRouter/historyRouter';
import { State } from '../../types/state';
import LoginBlock from './loginBlock';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';

const mockStore = configureMockStore<State>();
const history = createMemoryHistory();

describe('Component: LoginBlock', () => {
  it('Should render Sign in button if user is not logged in', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <LoginBlock />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('Should render Sign out button if user is logged in', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser()
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <LoginBlock />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });
});
