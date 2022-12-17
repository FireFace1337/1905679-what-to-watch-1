import { getRatingLevel } from '../../utils/film-rating-level';

type MovieOverviewProps = {
  rating: number;
  description: string;
  director: string;
  starring: string[];
  scoresCount: number;
}

function MovieOverview(props: MovieOverviewProps) {
  const {rating, description, director, starring, scoresCount} = props;
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(rating)}</span>
          <span className="film-rating__count">{scoresCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>
        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default MovieOverview;
