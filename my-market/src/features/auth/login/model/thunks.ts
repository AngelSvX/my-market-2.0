import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthPayload, DecodedToken, LoginRequest, PayloadPutRole } from "./types";
import { loginApi } from "../api";

export const fetchLogin = createAsyncThunk<
  AuthPayload, // lo que devuelve el fullfiled
  LoginRequest, // lo que recibe el thunk (payload)
  { rejectValue: string } // lo que se envía como error
>("login/fetchLogin", async (payload: LoginRequest, { rejectWithValue }) => {
  try {
    const res = await loginApi.login(payload);
    console.log(res.data, "esto es el res de fetchlogin");

    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error desconocido en el servidor";
    return rejectWithValue(message);
  }
});

export const googleLogin = createAsyncThunk<
  DecodedToken,
  string,
  { rejectValue: string }
>("login/google-auth", 
  async (google_auth, { rejectWithValue }) => {
    try {
      const res = await loginApi.google_login(google_auth);
      console.log(res.data, "esto es el res de google_auth")
      return res.data
    } catch (error:any) {
      const message =
        error.response?.data?.message || "Error desconocido en el servidor"
        return rejectWithValue(message)
    }
});

export const force_select_role = createAsyncThunk(
  'login/force-select-role',
  async (payload: PayloadPutRole) => {
    try {
      const res = await loginApi.forced_select_role(payload);
      console.log(res.data, "Datos del put")
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
