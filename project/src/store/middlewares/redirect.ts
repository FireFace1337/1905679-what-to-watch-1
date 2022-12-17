import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../../browserHistory';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> = (store) => (next) => (action) => {
  if (action.type === 'main/redirect') {
    browserHistory.push(action.payload);
  }

  next(action);
};
