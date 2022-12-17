import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  loadFilms,
  loadPromoFilm,
  loadCurrentFilm,
  loadComments,
  loadSimilarFilms,
  setLoadingStatus,
  updateAuthorizationStatus,
  loadUserData,
  redirect,
  updateComments,
} from './actions';
import { AppDispatch, State } from '../types/state';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import { AuthData } from '../types/authData';
import { UserData } from '../types/userData';
import { PostCommentData } from '../types/postCommentData';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { saveUser, removeUser } from '../services/user';
import { toastifyOptions } from '../const';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const films = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(films.data));

    const promoFilm = await api.get<Film>(APIRoute.Promo);
    dispatch(loadPromoFilm(promoFilm.data));

    dispatch(setLoadingStatus(false));
  }
);

export const fetchFilmById = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'data/fetchFilmById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    dispatch(loadCurrentFilm(data));
  }
);

export const fetchCommentsById = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'data/fetchCommentsById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${filmId}`);
    dispatch(loadComments(data));
  }
);

export const fetchSimilarFilmsById = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'data/fetchSimilarFilmsById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);
    dispatch(loadSimilarFilms(data));
  }
);

export const getAuthorizationStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'user/getAuthorizationStatus',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login)
      .catch((error) => {
        if (error) {
          dispatch(updateAuthorizationStatus(AuthorizationStatus.NoAuth));
        } else {
          dispatch(updateAuthorizationStatus(AuthorizationStatus.Auth));
        }
      });
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveUser(data);
    dispatch(updateAuthorizationStatus(AuthorizationStatus.Auth));
    Reflect.deleteProperty(data, 'token');
    dispatch(loadUserData(data));
    dispatch(redirect(AppRoute.Main));
    toast.success('You have logged in!', toastifyOptions);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    removeUser();
    dispatch(updateAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(loadUserData(null));
    dispatch(redirect(AppRoute.Login));
    toast.error('You have logged out!', toastifyOptions);
  }
);

export const postComment = createAsyncThunk<void, PostCommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'data/postComment',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(updateComments(data));
  }
);
