import { ToastOptions } from 'react-toastify';

export const NUMBER_OF_FILMS = 8;

export const toastifyOptions: ToastOptions = {
  theme: 'colored',
  position: 'bottom-right',
  autoClose: 4000,
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Films = '/films',
  Player = '/player',
  Review = '/review'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export const AllGenres = 'All Genres';

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Similar = '/similar'
}

export enum NameSpace {
  MainPage = 'MAIN_PAGE',
  User = 'USER',
  CurrentFilm = 'CURRENT_FILM'
}
