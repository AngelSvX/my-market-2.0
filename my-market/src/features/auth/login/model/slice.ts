import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthPayload, DecodedToken, LoginState } from "./types";
import { fetchLogin } from "./thunks";
import { jwtDecode } from "jwt-decode";

export const initialState: LoginState = {
  data: null,
  error: null,
  loading: false,
  userData: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state: LoginState) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        fetchLogin.fulfilled,
        (state: LoginState, action: PayloadAction<AuthPayload>) => {
          state.loading = false;
          state.data = action.payload;

          const token = action.payload.response.token;

          if (token && token.split(".").length === 3) {
            try {
              const decoded: DecodedToken = jwtDecode(token);
              state.userData = decoded;
            } catch (error) {
              console.error("Error al decodificar el token:", error);
              state.userData = null;
            }
          } else {
            state.userData = null;
          }
        }
      )
      .addCase(fetchLogin.rejected, (state: LoginState, action) => {
        (state.loading = false),
          (state.error = action.payload || "Ocurrió un error inesperado");
      });
  },
});

export default loginSlice.reducer;
