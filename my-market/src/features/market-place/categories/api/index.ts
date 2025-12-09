import axios from "axios";
import type { Categorie } from "../model/types";
import axiosInstance from "../../../../shared/api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL

const API_URL_USER = `${API_URL}/api/v1/user`;

export const categoriesApi = {
  getCategories: () => axios.get<Categorie[]>(`${API_URL_USER}/getCategories`),
  addCategory: (newCategory: string) =>
  axiosInstance.post<void>('/addCategory', {newCategorie: newCategory})
};
