import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/historyRouter/historyRouter';
import SignIn from './signIn';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore<State>();

describe('Component: SignIn', () => {
  it('Should render correctly', async () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByRole('heading').textContent).toEqual('Sign in');
    expect(screen.getByRole('button').textContent).toEqual('Sign in');
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/Email address/i), 'test@mail.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123456');

    expect(screen.getByDisplayValue('test@mail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password123456')).toBeInTheDocument();
  });
});
