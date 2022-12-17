import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { NameSpace, toastifyOptions } from '../../const';
import { CurrentFilmData } from '../../types/state';
import {
  fetchFilmById,
  fetchCommentsById,
  fetchSimilarFilmsById,
  postComment
} from '../api-actions';

const initialState: CurrentFilmData = {
  isLoading: false,
  film: null,
  comments: [],
  similarFilms: []
};

export const currentFilmData = createSlice({
  name: NameSpace.CurrentFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentsById.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchSimilarFilmsById.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(postComment.rejected, () => {
        toast.error('Couldn\'t post your review', toastifyOptions);
      });
  }
});
