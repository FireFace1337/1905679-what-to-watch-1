import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/film';
import { UserData } from '../../types/userData';
import { AuthorizationStatus } from '../../const';

export const getLoadingStatus = (state: State): boolean => state[NameSpace.User].isLoading;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getFavouriteFilms = (state: State): Film[] => state[NameSpace.User].favoriteFilms;

export const getUser = (state: State): UserData | null => state[NameSpace.User].user;
