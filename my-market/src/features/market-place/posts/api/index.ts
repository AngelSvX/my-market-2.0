import axios from 'axios'
import type { Post } from '../model/types'

const API_URL = "http://localhost:3000/api/v1/user"

export const postsApi = {
  getPosts : () => axios.get<Post[]>(`${API_URL}/getPosts`),
}