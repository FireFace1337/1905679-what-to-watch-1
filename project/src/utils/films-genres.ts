import { Film } from '../types/film';
import { AllGenres } from '../const';

export const getFilmGenres = (films: Film[]): string[] => {
  const genres = new Set(films.map((film) => film.genre));
  return [AllGenres, ...Array.from(genres).sort()];
};
