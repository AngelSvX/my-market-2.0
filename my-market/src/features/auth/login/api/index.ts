import axios from "axios";
import type { AuthPayload, DecodedToken, LoginRequest, PayloadPutRole } from "../model/types";

const API_URL = import.meta.env.VITE_API_URL

const API_LOGIN_URL = `${API_URL}/api/v1/auth`
const API_USER_URL = `${API_URL}/api/v1/user`

export const loginApi = {
  login: (payload: LoginRequest) => axios.post<AuthPayload>(`${API_LOGIN_URL}/login`, payload),
  google_login: (google_auth: string) => axios.post<DecodedToken>(`${API_LOGIN_URL}/google-auth`, {google_auth}),
  forced_select_role: (payload: PayloadPutRole) => axios.put(`${API_USER_URL}/updateRole/${payload.id}`, {role_id: payload.role_id})
}