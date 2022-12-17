import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadFilms, loadPromoFilm, setLoadingStatus } from './actions';
import { AppDispatch, State } from '../types/state';
import { Film } from '../types/film';
import { APIRoute } from '../const';

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
