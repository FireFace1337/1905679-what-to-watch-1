import { UserProcess } from '../../types/state';
import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser, makeFakeFilm } from '../../utils/mocks';
import { getAuthorizationStatus, loginAction, logoutAction, getMyList } from '../api-actions';

describe('Reducer: user proccess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      user: null,
      authorizationStatus: AuthorizationStatus.Unknown,
      isLoading: false,
      favoriteFilms: []
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        user: null,
        authorizationStatus: AuthorizationStatus.Unknown,
        isLoading: false,
        favoriteFilms: []
      });
  });

  describe('getAuthorizationStatus testing', () => {
    it('Should update authorizationStatus to AUTH if action is fulfilled', () => {
      expect(userProcess.reducer(state, {type: getAuthorizationStatus.fulfilled.type}))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.Auth,
          isLoading: false,
          favoriteFilms: []
        });
    });

    it('Should update authorizationStatus to NO_AUTH if action is rejected', () => {
      expect(userProcess.reducer(state, {type: getAuthorizationStatus.rejected.type}))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
          isLoading: false,
          favoriteFilms: []
        });
    });
  });

  describe('loginAction testing', () => {
    it('Should update authorizationStatus to AUTH and user if action is fulfilled', () => {
      const user = makeFakeUser();
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: user}))
        .toEqual({
          user: user,
          authorizationStatus: AuthorizationStatus.Auth,
          isLoading: false,
          favoriteFilms: []
        });
    });

    it('Should update authorizationStatus to NO_AUTH if action is rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
          isLoading: false,
          favoriteFilms: []
        });
    });
  });

  describe('logoutAction testing', () => {
    it('Should update authorizationStatus to NO_AUTH if action id fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
          isLoading: false,
          favoriteFilms: []
        });
    });
  });

  describe('getMyList testing', () => {
    it('Should update favoriteFilms if action is fulfilled', () => {
      const favoriteFilms = [makeFakeFilm({}), makeFakeFilm({}), makeFakeFilm({})];
      expect(userProcess.reducer(state, {type: getMyList.fulfilled.type, payload: favoriteFilms}))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.Unknown,
          isLoading: false,
          favoriteFilms: favoriteFilms
        });
    });
  });
});
