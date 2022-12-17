import FilmCard from '../filmCard/filmCard';
import { Film } from '../../types/film';
import { useState } from 'react';

type ListOfFilmsProps = {
  films: Film[];
}

function ListOfFilms({films}: ListOfFilmsProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState(0);

  const onMouseOver = (id: number) => {
    setActiveFilmId(id);
  };

  const onMouseOut = () => {
    setActiveFilmId(0);
  };

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
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            isActive={film.id === activeFilmId}
          />
        ))
      }
    </>
  );
}

export default ListOfFilms;
