import { render, screen } from '@testing-library/react';
import ShowMoreButton from './showMoreButton';

describe('Component: ShowMoreButton', () => {
  it('Should render correctly', () => {
    render(
      <ShowMoreButton onSetNumberOfFilms={jest.fn()} numberOfFilms={4} />
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
