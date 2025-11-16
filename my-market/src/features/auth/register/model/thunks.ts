import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterRequest } from "./types";
import { registerApi } from "../api";

export const fetchRegister = createAsyncThunk(
  'register/fetchRegister',
  async (payload: RegisterRequest) : Promise<void> => {
    await registerApi.register(payload)
  }
)