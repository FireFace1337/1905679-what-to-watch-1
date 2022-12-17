import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/authData';
import { PostCommentData } from '../types/postCommentData';
import {
  getAuthorizationStatus,
  loginAction,
  logoutAction,
  fetchFilms,
  fetchPromoFilm,
  fetchFilmById,
  fetchCommentsById,
  fetchSimilarFilmsById,
  postComment,
  getMyList,
  changeFavoriteFilmStatus,
} from './api-actions';
import { redirect } from './actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const filmId = '1';

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('getAuthorizationStatus testing', () => {
    it('getAuthorizationStatus should be fulfilled if server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(getAuthorizationStatus());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        getAuthorizationStatus.pending.type,
        getAuthorizationStatus.fulfilled.type
      ]);
    });

    it('getAuthorizationStatus should be rejected if server return 401', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(401);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(getAuthorizationStatus());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        getAuthorizationStatus.pending.type,
        getAuthorizationStatus.rejected.type
      ]);
    });
  });

  describe('loginAction testing', () => {
    it('loginAction and redirect should be fulfilled when POST /login', async () => {
      const fakeUserAuthData: AuthData = {email: 'test@mail.com', password: 'qwerty12345'};

      const store = mockStore();
      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, {token: 'secret'});

      Storage.prototype.setItem = jest.fn();
      await store.dispatch(loginAction(fakeUserAuthData));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        loginAction.pending.type,
        redirect.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('user-data', '{"token":"secret"}');
    });
  });

  describe('logoutAction testing', () => {
    it('logoutAction and redirect should be fulfilled when DELETE /logout', async () => {
      const store = mockStore();
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      Storage.prototype.removeItem = jest.fn();
      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        logoutAction.pending.type,
        redirect.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('user-data');
    });
  });

  describe('fetchFilms testing', () => {
    it('fetchFilms should be fulfilled when GET /films', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Films)
        .reply(200);

      await store.dispatch(fetchFilms());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchFilms.pending.type,
        fetchPromoFilm.pending.type,
        fetchFilms.fulfilled.type
      ]);
    });

    it('fetchFilms should be rejected when GET /films if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Films)
        .reply(500);

      await store.dispatch(fetchFilms());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchFilms.pending.type,
        fetchFilms.rejected.type
      ]);
    });
  });

  describe('fetchPromoFilm testing', () => {
    it('fetchPromoFilm should be fulfilled when GET /promo', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Promo)
        .reply(200);

      await store.dispatch(fetchPromoFilm());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.fulfilled.type
      ]);
    });

    it('fetchPromoFilm should be rejected when GET /promo if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Promo)
        .reply(500);

      await store.dispatch(fetchPromoFilm());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.rejected.type
      ]);
    });
  });

  describe('fetchFilmById testing', () => {
    it('fetchFilmById should be fulfilled when GET /film/{filmId}', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Films}/${filmId}`)
        .reply(200);

      await store.dispatch(fetchFilmById(filmId));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchFilmById.pending.type,
        fetchCommentsById.pending.type,
        fetchSimilarFilmsById.pending.type,
        fetchFilmById.fulfilled.type
      ]);
    });

    it('fetchFilmById should be rejected when GET /film/{filmId} if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Films}/${filmId}`)
        .reply(500);

      await store.dispatch(fetchFilmById(filmId));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchFilmById.pending.type,
        fetchFilmById.rejected.type
      ]);
    });
  });

  describe('fetchCommentsById testing', () => {
    it('fetchCommentsById should be fulfilled when GET /comments', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Comments}/${filmId}`)
        .reply(200);

      await store.dispatch(fetchCommentsById(filmId));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchCommentsById.pending.type,
        fetchCommentsById.fulfilled.type
      ]);
    });

    it('fetchCommentsById should be rejected when GET /comments if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Comments}/${filmId}`)
        .reply(500);

      await store.dispatch(fetchCommentsById(filmId));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchCommentsById.pending.type,
        fetchCommentsById.rejected.type
      ]);
    });
  });

  describe('fetchSimilarFilmsById testing', () => {
    it('fetchSimilarFilmsById should be fulfilled when GET /films/{filmId}/similar', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`)
        .reply(200);

      await store.dispatch(fetchSimilarFilmsById(filmId));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchSimilarFilmsById.pending.type,
        fetchSimilarFilmsById.fulfilled.type
      ]);
    });

    it('fetchSimilarFilmsById should be rejected when GET /films/{filmId}/similar if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`)
        .reply(500);

      await store.dispatch(fetchSimilarFilmsById(filmId));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        fetchSimilarFilmsById.pending.type,
        fetchSimilarFilmsById.rejected.type
      ]);
    });
  });

  describe('postComment testing', () => {
    const fakeComment: PostCommentData = {
      filmId,
      rating: 10,
      comment: 'comment'
    };

    it('postComment should be fulfilled when POST /comments/{filmId}', async () => {
      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Comments}/${filmId}`)
        .reply(200);

      await store.dispatch(postComment(fakeComment));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        postComment.pending.type,
        postComment.fulfilled.type
      ]);
    });

    it('postComment should be rejected when POST /comments/{filmId} if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Comments}/${filmId}`)
        .reply(500);

      await store.dispatch(postComment(fakeComment));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        postComment.pending.type,
        postComment.rejected.type
      ]);
    });
  });

  describe('getMyList testing', () => {
    it('getMyList should be fulfilled when GET /favorite', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(200);

      await store.dispatch(getMyList());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        getMyList.pending.type,
        getMyList.fulfilled.type
      ]);
    });

    it('getMyList should be rejected when GET /favorite if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(500);

      await store.dispatch(getMyList());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        getMyList.pending.type,
        getMyList.rejected.type
      ]);
    });
  });

  describe('changeFavoriteFilmStatus testing', () => {
    it('changeFavoriteFilmStatus should be fulfilled when POST /favorite/{filmId}/{status}', async () => {
      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Favorite}/${filmId}/1`)
        .reply(200);

      await store.dispatch(changeFavoriteFilmStatus({filmId, status: 1}));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        changeFavoriteFilmStatus.pending.type,
        getMyList.pending.type,
        fetchFilms.pending.type,
        fetchFilmById.pending.type,
        changeFavoriteFilmStatus.fulfilled.type
      ]);
    });

    it('changeFavoriteFilmStatus should be rejected when POST /favorite/{filmId}/{status} if server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Favorite}/${filmId}/1`)
        .reply(500);

      await store.dispatch(changeFavoriteFilmStatus({filmId, status: 1}));

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([
        changeFavoriteFilmStatus.pending.type,
        changeFavoriteFilmStatus.rejected.type
      ]);
    });
  });
});
