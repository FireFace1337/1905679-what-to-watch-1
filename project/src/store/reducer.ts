import { createReducer } from '@reduxjs/toolkit';
import { Genre } from '../const';
import {
  changeGenre,
  sortFilmsByGenre,
  loadFilms,
  loadPromoFilm,
  setLoadingStatus,
  updateAuthorizationStatus,
  loadUserData,
  loadCurrentFilm,
  loadComments,
  loadSimilarFilms,
  updateComments
} from './actions';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
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
  currentFilm: Film | null;
  comments: Comment[];
  similarFilms: Film[];
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
  currentFilm: null,
  comments: [],
  similarFilms: [],
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
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(updateComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    });
});
