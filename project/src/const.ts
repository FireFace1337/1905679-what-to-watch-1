export enum AppRoute {
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

export enum Genre {
  AllGenres = 'AllGenres',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Horror = 'Horror',
  KidsAndFamily = 'KidsAndFamily',
  Romance = 'Romance',
  SciFi = 'SciFi',
  Thriller = 'Thriller'
}

export const GenresObj = {
  'All genres': Genre.AllGenres,
  'Comedies': Genre.Comedy,
  'Crime': Genre.Crime,
  'Documentary': Genre.Documentary,
  'Dramas': Genre.Drama,
  'Horror': Genre.Horror,
  'Kids & Family': Genre.KidsAndFamily,
  'Romance': Genre.Romance,
  'Sci-Fi': Genre.SciFi,
  'Thrillers': Genre.Thriller
};

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}
