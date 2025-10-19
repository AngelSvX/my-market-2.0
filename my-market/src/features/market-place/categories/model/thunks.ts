import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Categorie } from "./types";
import { categoriesApi } from "../api";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () : Promise<Categorie[]> => {
    const res = await categoriesApi.getCategories()
    return res.data
  }
)

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (newCategory: string) : Promise<void> => {
    await categoriesApi.addCategory(newCategory)
  }
)