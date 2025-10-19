import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post, PostState } from "./types";
import { addPost, fetchPosts } from "./thunks";

export const initialState: PostState = {
  postList: [],
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
    builder
      .addCase(addPost.pending, (state) => {
        (state.loading = true), (state.error = null)
      })
      .addCase(addPost.fulfilled, (state) => {
        (state.loading = false), (state.error = null)
      })
      .addCase(addPost.rejected, (state) => {
        (state.loading = false), (state.error = "An error has ocurred adding the post")
      })
  },
});

export default postsSlice.reducer;
