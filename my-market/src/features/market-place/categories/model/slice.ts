import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Categorie, CaterogiesState } from "./types";
import { addCategory, fetchCategories } from "./thunks";

export const initialState: CaterogiesState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        (state.loading = true ), (state.error = null) 
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Categorie[]>) => {
          (state.loading = false), (state.categories = action.payload);
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        (state.loading = false),
        (state.error = "An error has ocurred fetching categories data")
      })
      builder
        .addCase(addCategory.pending, (state) => {
          (state.loading = true ),
          (state.error = null ) 
        })
        .addCase(addCategory.fulfilled, (state) => {
          (state.loading = false),
          (state.error = null)
        })
        .addCase(addCategory.rejected, (state) => {
          (state.loading = false),
          (state.error = null)
        } )
  },
});

export default categoriesSlice.reducer