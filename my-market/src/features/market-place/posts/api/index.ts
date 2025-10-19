import axios from 'axios'
import type { CreatePostRequest, Post } from '../model/types'
import axiosInstance from '../../../../shared/api/axiosInstance'

const API_URL = "http://localhost:3000/api/v1/user"

export const postsApi = {
  getPosts : () => axios.get<Post[]>(`${API_URL}/getPosts`),
  addPost: (payload: CreatePostRequest) => axiosInstance.post<void>('/addPost', payload)
}