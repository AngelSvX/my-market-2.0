import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthPayload, LoginState } from "./types";
import { fetchLogin } from "./thunks";

export const initialState : LoginState = {
  data: null,
  error: null,
  loading: false
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
      })
      .addCase(fetchLogin.rejected, (state: LoginState) => {
        state.loading = false,
        state.error = "An error has rejected fetching Login"
      })
  }
})

export default loginSlice.reducer