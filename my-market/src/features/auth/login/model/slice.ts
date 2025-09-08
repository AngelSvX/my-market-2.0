import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthPayload, DecodedToken, LoginState } from "./types";
import { fetchLogin } from "./thunks";
import { jwtDecode } from "jwt-decode";

export const initialState : LoginState = {
  data: null,
  error: null,
  loading: false,
  userData: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state: LoginState) => {
        state.loading = true,
        state.error = null
      })
      .addCase(fetchLogin.fulfilled, (state: LoginState, action: PayloadAction<AuthPayload>) => {
        state.loading = false,
        state.data = action.payload

        const decoded : DecodedToken = jwtDecode(action.payload.response.token)

        state.userData = decoded

      })
      .addCase(fetchLogin.rejected, (state: LoginState, action) => {
        state.loading = false,
        state.error = action.payload || "Ocurrió un error inesperado"
      })
  }
})

export default loginSlice.reducer