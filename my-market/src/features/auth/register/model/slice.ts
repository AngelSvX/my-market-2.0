import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RegisterRequest, RegisterState } from "./types";
import { fetchRegister } from "./thunks";

export const initialState: RegisterState = {
  registerData: null,
  isDataFullfiled: false,
  isRoleFullfiled: false,
  isReadyToSend: false,
  error: null,
  loading: false,
  successful: null,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    getMainData : (state, action: PayloadAction<RegisterRequest>) => {
      state.registerData = action.payload
      state.isDataFullfiled = true
    },
    getRoleData: (state, action: PayloadAction<number>) => {
      if (state.registerData) {
        state.registerData.role_id = action.payload
        state.isRoleFullfiled = true
      }
    },
    clearData: (state) => {
      state.error = null
      state.isDataFullfiled = false
      state.isReadyToSend = false
      state.isRoleFullfiled = false
      state.registerData = null,
      state.successful = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchRegister.pending, (state) => {
      (state.error = null), (state.loading = true)
    })
    .addCase(fetchRegister.fulfilled, (state) => {
      (state.loading = false), (state.successful = "Registro completado exitosamente."),
      (state.isReadyToSend = true)
    })
    .addCase(fetchRegister.rejected, (state) => {
      (state.loading = false), (state.error = "Ha ocurrido un error, inténtalo de nuevo más tarde.")
    })
  }
})

export const { getMainData, getRoleData, clearData } = registerSlice.actions;
export default registerSlice.reducer;