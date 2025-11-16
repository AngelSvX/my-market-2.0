import axios from "axios";
import type { RegisterRequest } from "../model/types";

const API_AUTH_URL = "http://localhost:3000/api/v1/auth"

export const registerApi = {
  register: (payload: RegisterRequest) => axios.post(`${API_AUTH_URL}/create`, payload)
}