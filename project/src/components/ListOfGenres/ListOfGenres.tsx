import { Dispatch, SetStateAction } from 'react';
import { NUMBER_OF_FILMS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCurrentGenre } from '../../store/main-data/main-data';
import { getGenres, getCurrentGenre } from '../../store/main-data/selectors';

type ListOfGenresProps = {
  onSetNumberOfFilms: Dispatch<SetStateAction<number>>;
}

function ListOfGenres({onSetNumberOfFilms}: ListOfGenresProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(getCurrentGenre);
  const genres = useAppSelector(getGenres);

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre, index) => (
          <li
            key={`${genre}`}
            className={`catalog__genres-item ${genre === currentGenre && 'catalog__genres-item--active'}`}
          >
            <div
              className="catalog__genres-link"
              style={{cursor: 'pointer'}}
              onClick={() => {
                onSetNumberOfFilms(NUMBER_OF_FILMS);
                dispatch(changeCurrentGenre(genre));
              }}
            >
              {genre}
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default ListOfGenres;
