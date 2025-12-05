import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Categorie, CaterogiesState } from "./types";
import { addCategory, fetchCategories } from "./thunks";

export const initialState: CaterogiesState = {
  categories: [],
  categorySelected: null,
  wasAdded: false,
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.categorySelected = action.payload;
    },
    resetWasAdded: (state) => {
      state.wasAdded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Categorie[]>) => {
          (state.loading = false), (state.categories = action.payload);
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        (state.loading = false),
          (state.error = "An error has ocurred fetching categories data");
      });
    builder
      .addCase(addCategory.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addCategory.fulfilled, (state) => {
        (state.loading = false), (state.error = null),
        (state.wasAdded = true)
      })
      .addCase(addCategory.rejected, (state) => {
        (state.loading = false), (state.error = null);
      });
  },
});

export const { selectCategory, resetWasAdded } = categoriesSlice.actions;
export default categoriesSlice.reducer;
