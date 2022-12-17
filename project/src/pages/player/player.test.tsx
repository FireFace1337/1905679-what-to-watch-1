import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/historyRouter/historyRouter';
import Player from './player';
import { State } from '../../types/state';
import { makeFakeFilm } from '../../utils/mocks';
import { AppRoute } from '../../const';
import { createAPI } from '../../services/api';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

const TestApp = ({store}: {store: Store}) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={`${AppRoute.Player}/:filmId`} element={ <Player /> } />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: Player page', () => {
  it('Should render correctly, video.play or pause should be called when play button is clicked', async () => {
    const store = mockStore({
      CURRENT_FILM: {
        film: makeFakeFilm({}),
        isLoading: false
      }
    });
    history.push(`${AppRoute.Player}/1`);

    window.HTMLVideoElement.prototype.play = jest.fn();

    mockAPI
      .onGet(`${AppRoute.Films}/1`)
      .reply(200);

    render(
      <TestApp store={store} />
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('full_screen')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('play'));
    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });

  it('Should render loadingScreen when it\'s loading', () => {
    const store = mockStore({
      CURRENT_FILM: {
        isLoading: true
      }
    });
    history.push(`${AppRoute.Player}/1`);

    render(
      <TestApp store={store} />
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
