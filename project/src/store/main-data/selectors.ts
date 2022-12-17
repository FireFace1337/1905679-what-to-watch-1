import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/film';
import { AllGenres } from '../../const';

export const getLoadingStatus = (state: State): boolean => state[NameSpace.MainPage].isLoading;

export const getFilms = (state: State): Film[] => state[NameSpace.MainPage].listOfFilms;

export const getPromoFilm = (state: State): Film | null => state[NameSpace.MainPage].promoFilm;

export const getCurrentGenre = (state: State): string => state[NameSpace.MainPage].currentGenre;

export const getGenres = (state: State): string[] => state[NameSpace.MainPage].genres;

export const filterFilmsByGenre = createSelector(
  [getCurrentGenre, getFilms],
  (genre, films) => {
    if (genre === AllGenres) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  }
);
