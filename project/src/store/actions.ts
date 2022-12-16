import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../const';

export const changeGenre = createAction('main/changeGenre', (genre: Genre) => ({
  payload: genre
}));

export const updateListOfFilms = createAction('main/updateListOfFilms');
