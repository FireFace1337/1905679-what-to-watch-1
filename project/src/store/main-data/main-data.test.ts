import { MainData } from '../../types/state';
import { mainData } from './main-data';
import { changeCurrentGenre } from './main-data';
import { fetchFilms, fetchPromoFilm } from '../api-actions';
import { getFilmGenres } from '../../utils/films-genres';
import { makeFakeFilm } from '../../utils/mocks';
import { AllGenres } from '../../const';

describe('Reducer: main data', () => {
  let state: MainData;

  beforeEach(() => {
    state = {
      listOfFilms: [],
      promoFilm: null,
      isLoading: false,
      currentGenre: AllGenres,
      genres: []
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(mainData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        listOfFilms: [],
        promoFilm: null,
        isLoading: false,
        currentGenre: AllGenres,
        genres: []
      });
  });

  it('Should update listOfFilms and genres in state by loaded films', () => {
    const films = [makeFakeFilm({}), makeFakeFilm({}), makeFakeFilm({})];
    const genres = getFilmGenres(films);
    expect(mainData.reducer(state, {type: fetchFilms.fulfilled.type, payload: films}))
      .toEqual({
        listOfFilms: films,
        promoFilm: null,
        isLoading: false,
        currentGenre: AllGenres,
        genres: genres
      });
  });

  it('Should update promoFilm in state by loaded film', () => {
    const promoFilm = makeFakeFilm({});
    expect(mainData.reducer(state, {type: fetchPromoFilm.fulfilled.type, payload: promoFilm}))
      .toEqual({
        listOfFilms: [],
        promoFilm: promoFilm,
        isLoading: false,
        currentGenre: AllGenres,
        genres: []
      });
  });

  it('Should change current genre', () => {
    expect(mainData.reducer(state, changeCurrentGenre('Action')))
      .toEqual({
        listOfFilms: [],
        promoFilm: null,
        isLoading: false,
        currentGenre: 'Action',
        genres: []
      });

    expect(mainData.reducer(state, changeCurrentGenre('Thriller')))
      .toEqual({
        listOfFilms: [],
        promoFilm: null,
        isLoading: false,
        currentGenre: 'Thriller',
        genres: []
      });

    expect(mainData.reducer(state, changeCurrentGenre('Drama')))
      .toEqual({
        listOfFilms: [],
        promoFilm: null,
        isLoading: false,
        currentGenre: 'Drama',
        genres: []
      });
  });
});
