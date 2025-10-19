import axios from "axios";
import type { Categorie } from "../model/types";
import axiosInstance from "../../../../shared/api/axiosInstance";

const API_URL = "http://localhost:3000/api/v1/user";

export const categoriesApi = {
  getCategories: () => axios.get<Categorie[]>(`${API_URL}/getCategories`),
  addCategory: (newCategory: string) =>
  axiosInstance.post<void>('/addCategory', {newCategorie: newCategory})
};
