import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../historyRouter/historyRouter';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('Should render correctly if link is not light', () => {
    render(
      <HistoryRouter history={history}>
        <Logo isLinkLight={false} />
      </HistoryRouter>
    );

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByRole('link').className).toEqual('logo__link null');
  });

  it('Should render correctly if link is light', () => {
    render(
      <HistoryRouter history={history}>
        <Logo isLinkLight />
      </HistoryRouter>
    );

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByRole('link').className).toEqual('logo__link logo__link--light');
  });
});
