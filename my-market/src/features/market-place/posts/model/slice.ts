import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post, PostState } from "./types";
import { fetchPosts } from "./thunks";

export const initialState: PostState = {
  postList: [],
  commentOpenId: null,
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        (state.loading = false), (state.postList = action.payload);
      })
      .addCase(fetchPosts.rejected, (state) => {
        (state.loading = false),
          (state.error = "An Error has rejected fetching posts");
      });
  },
});

export default postsSlice.reducer;
