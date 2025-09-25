import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthPayload, LoginRequest } from "./types";
import { loginApi } from "../api";

export const fetchLogin = createAsyncThunk<
  AuthPayload,          // lo que retorna si todo va bien
  LoginRequest,        // lo que recibe como argumento
  {rejectValue: string} // tipo del error si falla
>(
  "login/fetchLogin",
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await loginApi.login(payload);
      console.log(res.data, "esto es el res de fetchlogin")

      return res.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Error desconocido en el servidor";
      return rejectWithValue(message);
    }
  }
);
