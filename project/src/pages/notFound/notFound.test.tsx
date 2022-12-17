import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/historyRouter/historyRouter';
import NotFound from './notFound';

describe('Component: NotFound', () => {
  it('Should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти на главную/i)).toBeInTheDocument();
  });
});
