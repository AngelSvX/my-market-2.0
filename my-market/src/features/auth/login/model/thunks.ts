import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthPayload, LoginRequest } from "./types";
import { loginApi } from "../api";

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (payload: LoginRequest) : Promise<AuthPayload> => {
    const res = await loginApi.login(payload)
    return res.data
  }
)