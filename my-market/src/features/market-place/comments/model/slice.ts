import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review, ReviewState } from "./types";
import { fetchCommentsByPost } from "./thunks";

export const initialState: ReviewState = {
  comments: [],
  commentOpenId: null,
  loading: false,
  error: null
}

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
      commentOpenById: (state, action: PayloadAction<number>) => {
        state.commentOpenId = action.payload;
      },
      closeComments: (state) => {
        state.commentOpenId = null;
      },
    },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCommentsByPost.pending, (state) => {
      (state.loading = true),
      (state.error = null)
    })
    .addCase(fetchCommentsByPost.fulfilled, (state, action: PayloadAction<Review[]>) => {
      (state.loading = false),
      (state.comments = action.payload)
    })
    .addCase(fetchCommentsByPost.rejected, (state) => {
      (state.loading = false),
      (state.error = "An error has ocurred fetching comments")
    })
  }
})

export const { commentOpenById, closeComments } = commentsSlice.actions;
export default commentsSlice.reducer