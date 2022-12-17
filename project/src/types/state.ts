import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { UserData } from './userData';
import { Film } from './film';
import { Comment } from './comment';

export type State = ReturnType<typeof store.getState>;

export type UserProcess = {
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  favoriteFilms: Film[];
}

export type MainData = {
  currentGenre: string;
  genres: string[];
  isLoading: boolean;
  listOfFilms: Film[];
  promoFilm: Film | null;
}

export type CurrentFilmData = {
  isLoading: boolean;
  film: Film | null;
  comments: Comment[];
  similarFilms: Film[];
}

export type AppDispatch = typeof store.dispatch;
