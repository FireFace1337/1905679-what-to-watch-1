import { createAction } from '@reduxjs/toolkit';
import { AppRoute, Genre } from '../const';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import { UserData } from '../types/userData';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction('main/changeGenre', (genre: Genre) => ({
  payload: genre
}));

export const sortFilmsByGenre = createAction<void>('main/sortFilmsByGenre');

export const loadFilms = createAction('data/loadFilms', (films: Film[]) => ({
  payload: films
}));

export const loadCurrentFilm = createAction('data/loadCurrentFilm', (film: Film) => ({
  payload: film
}));

export const loadPromoFilm = createAction('data/loadPromoFilm', (film: Film) => ({
  payload: film
}));

export const setLoadingStatus = createAction('data/setLoadingStatus', (status: boolean) => ({
  payload: status
}));

export const updateAuthorizationStatus = createAction('user/updateAuthorizationStatus', (status: AuthorizationStatus) => ({
  payload: status
}));

export const loadUserData = createAction('user/loadUserData', (user: UserData | null) => ({
  payload: user
}));

export const redirect = createAction('main/redirect', (route: AppRoute | string) => ({
  payload: route
}));

export const loadComments = createAction('data/loadComments', (comments: Comment[]) => ({
  payload: comments
}));

export const loadSimilarFilms = createAction('data/loadSimilarFilms', (films: Film[]) => ({
  payload: films
}));

export const updateComments = createAction('data/addComment', (comments: Comment[]) => ({
  payload: comments
}));
