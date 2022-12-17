import { SetStateAction, Dispatch } from 'react';

type ShowMoreButtonProps = {
  onSetNumberOfFilms: Dispatch<SetStateAction<number>>;
  numberOfFilms: number;
}

function ShowMoreButton({onSetNumberOfFilms, numberOfFilms}: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => onSetNumberOfFilms((prevState) => prevState + numberOfFilms)}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
