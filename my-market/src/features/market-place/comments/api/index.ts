import axios from "axios"
import type { CommentParams, Review } from "../model/types"

const API_URL = "http://localhost:3000/api/v1/user"

export const commentsApi = {
  getCommentsByPost : (id: number) => axios.get<Review[]>(`${API_URL}/getComments/${id}`),
  addCommentByPost: (params: CommentParams) => axios.post<void>(`${API_URL}/addCommentByPost`, params)
}