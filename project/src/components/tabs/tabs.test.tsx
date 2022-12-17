import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import Tabs from './tabs';
import { Tab } from '../../const';
import { makeFakeFilm, makeFakeComment } from '../../utils/mocks';

const mockStore = configureMockStore<State>();

const store = mockStore({
  CURRENT_FILM: {
    film: makeFakeFilm({}),
    comments: [makeFakeComment()]
  }
});

describe('Component: Tabs', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    expect(screen.getByText(Tab.Overview)).toBeInTheDocument();
    expect(screen.getByText(Tab.Details)).toBeInTheDocument();
    expect(screen.getByText(Tab.Reviews)).toBeInTheDocument();
  });
});
