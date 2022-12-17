import { render, screen } from '@testing-library/react';
import { MovieOverview, MovieDetails, MovieReviews } from './index';
import { makeFakeComment } from '../../utils/mocks';

describe('Components: MovieTabs', () => {
  it('MovieOverview should render correctly', () => {
    render(
      <MovieOverview
        rating={7}
        description='description'
        director='director'
        starring={['actor1', 'actor2']}
        scoresCount={10000}
      />
    );

    expect(screen.getByText(7).className).toEqual('film-rating__score');
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('10 000 ratings')).toBeInTheDocument();
    expect(screen.getByText('Director: director')).toBeInTheDocument();
    expect(screen.getByText('Starring: actor1, actor2 and other')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('MovieDetails should render correctly', () => {
    render(
      <MovieDetails
        director='mock-director'
        starring={['actor1', 'actor2']}
        runTime={90}
        genre='Thriller'
        released={1998}
      />
    );

    expect(screen.getByText('mock-director')).toBeInTheDocument();
    expect(screen.getByText('actor1')).toBeInTheDocument();
    expect(screen.getByText('actor2')).toBeInTheDocument();
    expect(screen.getByText('1h 30m')).toBeInTheDocument();
    expect(screen.getByText('Thriller')).toBeInTheDocument();
    expect(screen.getByText(1998)).toBeInTheDocument();
  });

  it('MovieReviews should render correctly', () => {
    const review = makeFakeComment();
    const {comment, user, rating} = review;

    render(
      <MovieReviews reviews={[review]} />
    );

    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
  });
});
