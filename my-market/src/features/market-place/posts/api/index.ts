import axios from 'axios'
import type { CreatePostRequest, Post, UpdatePostRequest, UpdateStatusRequest } from '../model/types'
import axiosInstance from '../../../../shared/api/axiosInstance'

const API_URL = import.meta.env.VITE_API_URL

const API_URL_USER = `${API_URL}/api/v1/user`

export const postsApi = {
  getPosts : () => axios.get<Post[]>(`${API_URL_USER}/getPosts`),
  addPost: (payload: CreatePostRequest) => axiosInstance.post<void>('/addPost', payload),
  updatePostStatus: (payload: UpdateStatusRequest) => axiosInstance.put<void>(`${API_URL_USER}/updateStatus/${payload.id}`, {status: payload.status} ),
  filterByCategory: (categoryId: number) => axios.get<Post[]>(`${API_URL_USER}/filterByCategory/${categoryId}`),
  updatePost: async (payload: UpdatePostRequest) => {
    const {id, ...data} = payload
    await axios.put<void>(`${API_URL_USER}/updatePost/${id}`, data)
  }
}