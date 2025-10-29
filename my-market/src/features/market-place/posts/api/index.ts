import axios from 'axios'
import type { CreatePostRequest, Post, UpdateStatusRequest } from '../model/types'
import axiosInstance from '../../../../shared/api/axiosInstance'

const API_URL = "http://localhost:3000/api/v1/user"

export const postsApi = {
  getPosts : () => axios.get<Post[]>(`${API_URL}/getPosts`),
  addPost: (payload: CreatePostRequest) => axiosInstance.post<void>('/addPost', payload),
  updatePostStatus: (payload: UpdateStatusRequest) => axios.put<void>(`${API_URL}/updateStatus/${payload.id}`, {status: payload.status} ),
  filterByCategory: (categoryId: number) => axios.get<Post[]>(`${API_URL}/filterByCategory/${categoryId}`)
}