import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../../browserHistory';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> = (store) => (next) => (action) => {
  if (action.type === 'REDIRECT') {
    browserHistory.push(action.payload);
  }

  next(action);
};
