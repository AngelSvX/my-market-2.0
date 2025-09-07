import axios from "axios";
import type { AuthPayload, LoginRequest } from "../model/types";

const API_LOGIN_URL = "http://localhost:3000/api/v1/auth"

export const loginApi = {
  login: (payload: LoginRequest) => axios.post<AuthPayload>(`${API_LOGIN_URL}/login`, payload)
}