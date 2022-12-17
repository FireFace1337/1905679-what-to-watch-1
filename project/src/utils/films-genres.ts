import { Film } from '../types/film';
import { AllGenres, MAX_NUMBER_OF_GENRES } from '../const';

export const getFilmGenres = (films: Film[]): string[] => {
  const genres = new Set(films.map((film) => film.genre));
  const genresArray = Array.from(genres);

  while (genresArray.length > MAX_NUMBER_OF_GENRES) {
    genresArray.pop();
  }

  return [AllGenres, ...genresArray.sort()];
};
