import FilmCard from '../filmCard/filmCard';
import { Film } from '../../types/film';

type ListOfFilmsProps = {
  films: Film[];
}

function ListOfFilms({films}: ListOfFilmsProps): JSX.Element {
  return (
    <>
      {
        films.map((film: Film): JSX.Element => (
          <FilmCard
            key={film.id}
            name={film.name}
            previewImage={film.previewImage}
            id={film.id}
            previewVideoLink={film.previewVideoLink}
          />
        ))
      }
    </>
  );
}

export default ListOfFilms;
