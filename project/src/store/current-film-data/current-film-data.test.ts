import { CurrentFilmData } from '../../types/state';
import { currentFilmData } from './current-film-data';
import {
  fetchFilmById,
  fetchCommentsById,
  fetchSimilarFilmsById,
  postComment
} from '../api-actions';
import { makeFakeComment, makeFakeFilm } from '../../utils/mocks';

describe('Reducer: current film', () => {
  let state: CurrentFilmData;

  beforeEach(() => {
    state = {
      isLoading: false,
      film: null,
      comments: [],
      similarFilms: []
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(currentFilmData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isLoading: false,
        film: null,
        comments: [],
        similarFilms: []
      });
  });

  it('Should update film in state by loaded film', () => {
    const fakeFilm = makeFakeFilm({});
    expect(currentFilmData.reducer(state, {type: fetchFilmById.fulfilled.type, payload: fakeFilm}))
      .toEqual({
        isLoading: false,
        film: fakeFilm,
        comments: [],
        similarFilms: []
      });
  });

  it('Should update comments in state by loaded comments', () => {
    const comments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
    expect(currentFilmData.reducer(state, {type: fetchCommentsById.fulfilled.type, payload: comments}))
      .toEqual({
        isLoading: false,
        film: null,
        comments: comments,
        similarFilms: []
      });
  });

  it('Should update similar films in state by loaded similar films', () => {
    const similarFilms = [makeFakeFilm({}), makeFakeFilm({}), makeFakeFilm({})];
    expect(currentFilmData.reducer(state, {type: fetchSimilarFilmsById.fulfilled.type, payload: similarFilms}))
      .toEqual({
        isLoading: false,
        film: null,
        comments: [],
        similarFilms: similarFilms,
      });
  });

  it('Should update comments in state by loaded "posted" comments', () => {
    const comments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
    expect(currentFilmData.reducer(state, {type: postComment.fulfilled.type, payload: comments}))
      .toEqual({
        isLoading: false,
        film: null,
        comments: comments,
        similarFilms: []
      });
  });
});
