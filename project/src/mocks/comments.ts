import { Comment } from '../types/comment';

export const comments: Comment[] = [
  {
    id: 1,
    user: {
      id: 3,
      name: 'Maxim'
    },
    rating: 5,
    comment: 'Nice movie',
    date: '2022-08-03T11:28:34.946Z'
  },
  {
    id: 2,
    user: {
      id: 11,
      name: 'Anna'
    },
    rating: 8.2,
    comment: 'The best movie 2022',
    date: '2022-10-23T22:11:10.946Z'
  }
];
