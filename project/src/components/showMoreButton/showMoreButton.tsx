import { SetStateAction, Dispatch } from 'react';
import { NUMBER_OF_FILMS } from '../../const';

type ShowMoreButtonProps = {
  onSetNumberOfFilms: Dispatch<SetStateAction<number>>;
}

function ShowMoreButton({onSetNumberOfFilms}: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => onSetNumberOfFilms((prevState) => prevState + NUMBER_OF_FILMS)}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
