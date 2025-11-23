import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthPayload,
  DecodedToken,
  LoginState,
  PayloadPutRole,
} from "./types";
import { fetchLogin, force_select_role, googleLogin } from "./thunks";
import { jwtDecode } from "jwt-decode";

export const initialState: LoginState = {
  data: null,
  google_token: null,
  error: null,
  loading: false,
  userData: null,
  getRole: null,
  google_auth_fullfiled: false,
  roleSelected: false
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getGoogleToken: (state, action: PayloadAction<string>) => {
      state.google_token = action.payload
    },
    getRoleId: (state: LoginState, action: PayloadAction<PayloadPutRole>) => {
      state.getRole = action.payload
    },
    roleWasSelected: (state: LoginState, action: PayloadAction<boolean>) => {
      state.roleSelected = action.payload
    },
    restarLoginParams: (state: LoginState) => {
      state.userData = null
      state.google_token = null
    }
  },
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

    builder
      .addCase(googleLogin.pending, (state: LoginState) => {
        (state.loading = true), (state.error = null)
      })
      .addCase(googleLogin.fulfilled, (state: LoginState, action: PayloadAction<DecodedToken>) => {
        (state.loading = false), (state.userData = action.payload), (state.google_auth_fullfiled = true)
      })
      .addCase(googleLogin.rejected, (state: LoginState, action) => {
        (state.loading = false), (state.error = action.payload || "Ocurrió un error inesperado")
      })

    builder
      .addCase(force_select_role.pending, (state: LoginState) => {
        (state.loading = true), (state.error = null)
      })
      .addCase(force_select_role.fulfilled, (state: LoginState) => {
        (state.loading = false)
      })
      .addCase(force_select_role.rejected, (state: LoginState) => {
        (state.loading = false), (state.error = "An error has ocurred using google_auth")
      })
  },
});

export const { getGoogleToken, getRoleId, roleWasSelected, restarLoginParams } = loginSlice.actions;
export default loginSlice.reducer;
