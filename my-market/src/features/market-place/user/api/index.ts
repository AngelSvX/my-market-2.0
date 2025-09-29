import axios from "axios"
import type { ProfileDataResponse } from "../model/types"

const API_URL = "http://localhost:3000/api/v1/user"

export const userApi = {
  getProfileData : (id: number) => axios.get<ProfileDataResponse>(`${API_URL}/profile/${id}`),
}