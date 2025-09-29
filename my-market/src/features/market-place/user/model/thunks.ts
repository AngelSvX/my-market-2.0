import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProfileDataResponse } from "./types";
import { userApi } from "../api";

export const fetchProfileData = createAsyncThunk(
  'user/fetchProfileData',
  async (id: number) : Promise<ProfileDataResponse> => {
    const res = await userApi.getProfileData(id)
    return res.data
  }
)