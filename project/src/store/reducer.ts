import { createReducer } from '@reduxjs/toolkit';
import { Genre } from '../const';
import { changeGenre, sortFilmsByGenre, loadFilms, loadPromoFilm, setLoadingStatus, updateAuthorizationStatus, loadUserData } from './actions';
import { Film } from '../types/film';
import { UserData } from '../types/userData';
import { AuthorizationStatus } from '../const';
import { getUser } from '../services/user';

type stateType = {
  genre: Genre;
  listOfFilms: Film[];
  promoFilm: Film | null;
  favouriteFilms: Film[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
}

const user = getUser();

const initialState: stateType = {
  genre: Genre.AllGenres,
  listOfFilms: [],
  promoFilm: null,
  favouriteFilms: [],
  isLoading: true,
  authorizationStatus: user ? AuthorizationStatus.Auth : AuthorizationStatus.Unknown,
  user,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(sortFilmsByGenre, (state) => {
      state.listOfFilms = state.listOfFilms.filter((film) => {
        if (state.genre === Genre.AllGenres) {
          return state.listOfFilms;
        }
        else if (state.genre === film.genre) {
          return film;
        }
        return null;
      });
    })
    .addCase(loadFilms, (state, action) => {
      state.listOfFilms = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(updateAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.user = action.payload;
    });
});
