import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { State } from '../../types/state';
import ListOfGenres from './ListOfGenres';

const mockStore = configureMockStore<State>();

const store = mockStore({
  MAIN_PAGE: {
    genres: ['All Genres', 'Action', 'Drama', 'Thriller'],
    currentGenre: 'All Genres'
  }
});

const onSetNumberOfFilmsHandler = jest.fn();

const TestApp = (
  <Provider store={store}>
    <ListOfGenres onSetNumberOfFilms={onSetNumberOfFilmsHandler} />
  </Provider>
);

describe('Component: ListOfGenres', () => {

  it('Should render correctly', () => {
    render(TestApp);

    expect(screen.getByTestId('genres')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('Should react correctly to user action', async () => {
    render(TestApp);

    await userEvent.click(screen.getByText('Thriller'));
    expect(onSetNumberOfFilmsHandler).toBeCalled();
  });
});
