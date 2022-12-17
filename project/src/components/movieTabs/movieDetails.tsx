type MovieDetailsProps = {
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
}

function MovieDetails(props: MovieDetailsProps) {
  const {director, starring, runTime, genre, released} = props;

  const getHMM = (minutes: number): string => {
    const date = new Date(minutes * 60000).toISOString().substring(12, 16);
    const [hours, mins] = date.split(':');
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              starring.map((star): JSX.Element => (
                <span className="starring_star" key={`${star}`}>{star}</span>
              ))
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getHMM(runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
