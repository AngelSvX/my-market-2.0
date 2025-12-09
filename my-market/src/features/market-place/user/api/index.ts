import axios from "axios"
import type { ProfileDataResponse } from "../model/types"

const API_URL = import.meta.env.VITE_API_URL

const API_URL_USER = `${API_URL}/api/v1/user`

export const userApi = {
  getProfileData : (id: number) => axios.get<ProfileDataResponse>(`${API_URL_USER}/profile/${id}`),
}