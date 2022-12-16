import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { promoFilm } from '../mocks/promoFilm';
import { favouriteFilms } from '../mocks/favouriteFilms';
import { Genre } from '../const';
import { changeGenre, updateListOfFilms } from './actions';

const initialState = {
  genre: Genre.AllGenres,
  listOfFilms: films,
  promoFilm,
  favouriteFilms
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(updateListOfFilms, (state) => {
      state.listOfFilms = films.filter((film) => {
        if (state.genre === Genre.AllGenres) {
          return films;
        }
        else if (state.genre === film.genre) {
          return film;
        }
        return null;
      });
    });
});
