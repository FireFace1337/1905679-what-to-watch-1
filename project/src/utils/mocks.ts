import { datatype, music, image, date, internet, name } from 'faker';
import { Comment } from '../types/comment';
import { Film } from '../types/film';
import { UserData } from '../types/userData';

const getStarring = (): string[] => [name.findName(), name.findName(), name.findName()];

type makeFakeFilmProps = {
  isGenreTheSame?: boolean;
}

export const makeFakeFilm = ({isGenreTheSame}: makeFakeFilmProps): Film => ({
  id: datatype.number(),
  name: datatype.string(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: datatype.string(),
  rating: datatype.number(10),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: getStarring(),
  runTime: datatype.number(),
  genre: isGenreTheSame ? 'genre' : music.genre(),
  released: datatype.number({min: 1900, max: 2022}),
  isFavorite: datatype.boolean(),
});

export const makeFakeComment = (): Comment => ({
  comment: datatype.string(),
  date: String(date.recent()),
  id: datatype.number(),
  rating: datatype.number(10),
  user: {
    id: datatype.number(),
    name: datatype.string(),
  }
});

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  name: internet.userName(),
  token: datatype.uuid(),
});
