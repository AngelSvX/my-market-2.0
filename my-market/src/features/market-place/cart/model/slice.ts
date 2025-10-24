import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article, CartState } from "./types";

export const initialState: CartState = {
  articleList: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addArticle: (state, articles: PayloadAction<Article>) : void => {
      state.articleList.push(articles.payload)
    },
    deleteArticle: (state, action: PayloadAction<number>) : void => {
      state.articleList = state.articleList.filter((article) => article.id !== action.payload )
    }
  }
})

export const { addArticle, deleteArticle } = cartSlice.actions
export default cartSlice.reducer