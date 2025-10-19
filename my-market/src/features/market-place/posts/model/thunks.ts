import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreatePostRequest, Post } from "./types";
import { postsApi } from "../api";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () : Promise<Post[]> => {
    const res = await postsApi.getPosts()
    return res.data
  }
)

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (payload: CreatePostRequest) : Promise<void> => {
    await postsApi.addPost(payload)
  }
)