import axios from "axios"
import type { CommentParams, Review } from "../model/types"

const API_URL = import.meta.env.VITE_API_URL

const API_URL_USER = `${API_URL}/api/v1/user`

export const commentsApi = {
  getCommentsByPost : (id: number) => axios.get<Review[]>(`${API_URL_USER}/getComments/${id}`),
  addCommentByPost: (params: CommentParams) => axios.post<void>(`${API_URL_USER}/addCommentByPost`, params)
}