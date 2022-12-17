import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loadFilms, loadPromoFilm, setLoadingStatus, updateAuthorizationStatus, loadUserData, redirect } from './actions';
import { AppDispatch, State } from '../types/state';
import { Film } from '../types/film';
import { AuthData } from '../types/authData';
import { UserData } from '../types/userData';
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
