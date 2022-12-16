import { SetStateAction, Dispatch } from 'react';

type ShowMoreButtonProps = {
  setNumberOfFilms: Dispatch<SetStateAction<number>>;
}

function ShowMoreButton({setNumberOfFilms}: ShowMoreButtonProps) {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => setNumberOfFilms((prevState) => prevState + 8)}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
