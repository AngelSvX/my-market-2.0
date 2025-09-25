import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "./types";
import { postsApi } from "../api";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () : Promise<Post[]> => {
    const res = await postsApi.getPosts()
    return res.data
  }
)