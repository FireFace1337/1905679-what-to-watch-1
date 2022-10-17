import {TypeGenres} from './types/genre';

export enum AppRoute {
    Main = '/',
    SignIn = '/login',
    MyList = 'mylist',
    Film = '/films/:id',
    AddReview = 'films/:id/review',
    Player = 'player/:id'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const GenresList: TypeGenres[] = [
  {
    titleGenre: 'COMEDY',
    id: 1,
  },
  {
    titleGenre: 'DRAMA',
    id: 2,
  },
  {
    titleGenre: 'MELODRAMA',
    id: 3.
  },
  {
    titleGenre: 'HORROR',
    id: 4,
  },
  {
    titleGenre: 'THRILLER',
    id: 5,
  },
  {
    titleGenre: 'ACTION_MOVIE',
    id: 6,
  },
  {
    titleGenre: 'POST_APOCALYPTIC',
    id: 7,
  }
];
