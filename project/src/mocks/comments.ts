import { Comment } from '../types/comment';

export const comments: Comment[] = [
  {
    id: 1,
    user: {
      id: 19,
      name: 'Christina'
    },
    rating: 7,
    comment: 'A movie that will take you to another world full of emotions.',
    date: '2022-06-02T12:25:36.946Z'
  },
  {
    id: 2,
    user: {
      id: 13,
      name: 'Zak'
    },
    rating: 8.2,
    comment: 'I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.',
    date: '2022-06-22T12:25:36.946Z'
  }
];
