import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmData } from './main-data/main-data';
import { currentFilmData } from './current-film-data/current-film-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.MainPage]: filmData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentFilm]: currentFilmData.reducer
});
