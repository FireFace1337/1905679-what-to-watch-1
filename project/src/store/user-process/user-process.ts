import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { getUser } from '../../services/user';
import { getAuthorizationStatus, loginAction, logoutAction, getMyList } from '../api-actions';

const user = getUser();

if (user) {
  Reflect.deleteProperty(user, 'token');
}

const initialState: UserProcess = {
  user,
  authorizationStatus: user ? AuthorizationStatus.Auth : AuthorizationStatus.Unknown,
  isLoading: false,
  favoriteFilms: []
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthorizationStatus.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(getAuthorizationStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.user = null;
        state.favoriteFilms = [];
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.favoriteFilms = [];
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(getMyList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyList.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isLoading = false;
      });
  }
});
