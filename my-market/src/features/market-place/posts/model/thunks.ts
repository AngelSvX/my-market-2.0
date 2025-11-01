import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreatePostRequest, Post, UpdatePostRequest, UpdateStatusRequest } from "./types";
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

export const updatePostStatus = createAsyncThunk(
  "/posts/updateStatus",
  async (payload: UpdateStatusRequest) : Promise<void> => {
    await postsApi.updatePostStatus(payload)
  }
)

export const filterByCategory = createAsyncThunk(
  "post/filterByCategory",
  async (category_id: number) => {
    const res = await postsApi.filterByCategory(category_id)
    return res.data
  }
)

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (payload: UpdatePostRequest) : Promise<void> => {
    await postsApi.updatePost(payload)
  }
)