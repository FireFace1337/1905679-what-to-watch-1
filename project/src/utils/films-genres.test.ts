import { getFilmGenres } from './films-genres';
import { makeFakeFilm } from './mocks';
import { AllGenres, MAX_NUMBER_OF_GENRES } from '../const';
import { Film } from '../types/film';

describe('Utils: Films genres', () => {
  let fakeFilms: Film[];
  beforeEach(() => {
    fakeFilms = [];
  });
  it('Simple check', () => {
    const answer: string[] = [AllGenres];
    for (let i = 0; i < 30; i++) {
      const fakeFilm = makeFakeFilm({});
      fakeFilms.push(fakeFilm);
      if (!answer.includes(fakeFilm.genre) && answer.length <= MAX_NUMBER_OF_GENRES) {
        answer.push(fakeFilm.genre);
      }
    }
    expect(getFilmGenres(fakeFilms)).toEqual(answer.sort());
  });

  it('If genres are the same', () => {
    const answer: string[] = [AllGenres, 'genre'];
    for (let i = 0; i < 30; i++) {
      const fakeFilm = makeFakeFilm({isGenreTheSame: true});
      fakeFilms.push(fakeFilm);
    }
    expect(getFilmGenres(fakeFilms)).toEqual(answer);
  });

  it('If there are a lot of films', () => {
    const answer: string[] = [AllGenres];
    for (let i = 0; i < 1000; i++) {
      const fakeFilm = makeFakeFilm({});
      fakeFilms.push(fakeFilm);
      if (!answer.includes(fakeFilm.genre) && answer.length <= MAX_NUMBER_OF_GENRES) {
        answer.push(fakeFilm.genre);
      }
    }
    expect(getFilmGenres(fakeFilms)).toEqual(answer.sort());
  });
});
