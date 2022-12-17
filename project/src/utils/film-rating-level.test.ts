import { getRatingLevel } from './film-rating-level';
import { RatingLevel } from '../const';

describe('Utils: Film rating level', () => {
  it('Should be Awesome', () => {
    expect(getRatingLevel(10)).toBe(RatingLevel.Awesome);
  });

  it('Should be Very Good', () => {
    expect(getRatingLevel(9)).toBe(RatingLevel.VeryGood);
  });

  it('Should be Good', () => {
    expect(getRatingLevel(6)).toBe(RatingLevel.Good);
  });

  it('Should be Normal', () => {
    expect(getRatingLevel(3)).toBe(RatingLevel.Normal);
  });

  it('Should be Bad', () => {
    expect(getRatingLevel(1)).toBe(RatingLevel.Bad);
  });
});
