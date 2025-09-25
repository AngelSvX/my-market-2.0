import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Review } from "./types"
import { commentsApi } from "../api"

export const fetchCommentsByPost = createAsyncThunk(
  'posts/fetchComments',
  async ( id : number) : Promise<Review[]> => {
    const res = await commentsApi.getCommentsByPost(id)
    return res.data
  }
)