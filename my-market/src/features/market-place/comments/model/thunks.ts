import { createAsyncThunk } from "@reduxjs/toolkit"
import type { CommentParams, Review } from "./types"
import { commentsApi } from "../api"

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchComments',
  async ( id : number) : Promise<Review[]> => {
    const res = await commentsApi.getCommentsByPost(id)
    return res.data
  }
)

export const addCommentByPost = createAsyncThunk(
  'comments/fetchComments',
  async (params: CommentParams) : Promise<void> => {
    await commentsApi.addCommentByPost(params)
  }
)