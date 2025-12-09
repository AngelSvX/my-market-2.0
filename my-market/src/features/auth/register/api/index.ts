import axios from "axios";
import type { RegisterRequest } from "../model/types";

const API_URL = import.meta.env.VITE_API_URL

const API_AUTH_URL = `${API_URL}/api/v1/auth`

export const registerApi = {
  register: (payload: RegisterRequest) => axios.post(`${API_AUTH_URL}/create`, payload)
}