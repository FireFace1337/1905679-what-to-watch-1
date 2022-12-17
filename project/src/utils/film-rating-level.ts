import { RatingLevel } from '../const';

export const getRatingLevel = (rating: number): string => {
  if (rating >= 0 && rating < 3) {
    return RatingLevel.Bad;
  } else if (rating >= 3 && rating < 5) {
    return RatingLevel.Normal;
  } else if (rating >= 5 && rating < 8) {
    return RatingLevel.Good;
  } else if (rating >= 8 && rating < 10) {
    return RatingLevel.VeryGood;
  } else {
    return RatingLevel.Awesome;
  }
};
