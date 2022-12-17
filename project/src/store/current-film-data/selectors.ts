import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Film } from '../../types/film';
import { Comment } from '../../types/comment';

export const getLoadingStatus = (state: State): boolean => state[NameSpace.CurrentFilm].isLoading;

export const getCurrentFilm = (state: State): Film | null => state[NameSpace.CurrentFilm].film;

export const getComments = (state: State): Comment[] => state[NameSpace.CurrentFilm].comments;

export const getSimilarFilms = (state: State): Film[] => state[NameSpace.CurrentFilm].similarFilms;
