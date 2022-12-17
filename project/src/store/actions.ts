import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../const';
import { Film } from '../types/film';

export const changeGenre = createAction('main/changeGenre', (genre: Genre) => ({
  payload: genre
}));

export const sortFilmsByGenre = createAction('main/sortFilmsByGenre');

export const loadFilms = createAction('data/loadFilms', (films: Film[]) => ({
  payload: films
}));

export const loadPromoFilm = createAction('data/loadPromoFilm', (film: Film) => ({
  payload: film
}));

export const setLoadingStatus = createAction('data/setLoadingStatus', (status: boolean) => ({
  payload: status
}));
