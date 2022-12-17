import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const redirect = createAction('REDIRECT', (route: AppRoute | string) => ({
  payload: route
}));
