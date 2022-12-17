import { Film } from '../types/film';

export const favouriteFilms : Film[] = [
  {
    name: 'Aviator',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Aviator.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/aviator.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Aviator.jpg',
    backgroundColor: '#D6CDAF',
    description: 'A biopic depicting the early years of legendary Director and aviator Howard Hughes\' career from the late 1920s to the mid 1940s.',
    rating: 9.8,
    scoresCount: 307174,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Cate Blanchett',
      'Kate Beckinsale'
    ],
    runTime: 170,
    genre: 'Drama',
    released: 2014,
    id: 8,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/bubbles.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
  {
    name: 'Pulp Fiction',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Pulp_Fiction.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/pulp-fiction.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Pulp_Fiction.jpg',
    backgroundColor: '#795433',
    description: 'The lives of two mob hitmen, a boxer, a gangster & his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 1.5,
    scoresCount: 1635992,
    director: 'Quentin Tarantino',
    starring: [
      'John Travolta',
      'Uma Thurman',
      'Samuel L. Jackson'
    ],
    runTime: 153,
    genre: 'Crime',
    released: 1994,
    id: 14,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/traffic.mp4'
  },
  {
    name: 'Gangs of new york',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Gangs_of_New_York_Poster.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/gangs_of_new_york.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/gangs_of_new_york.jpg',
    backgroundColor: '#A6B7AC',
    description: 'In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father\'s killer.',
    rating: 8.8,
    scoresCount: 370881,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Cameron Diaz',
      'Daniel Day-Lewis'
    ],
    runTime: 167,
    genre: 'Crime',
    released: 2002,
    id: 2,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  }
];
