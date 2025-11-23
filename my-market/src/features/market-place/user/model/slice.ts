import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileDataResponse, ProfileResponseState } from "./types";
import { fetchProfileData } from "./thunks";

export const initialState: ProfileResponseState = {
  profileResponse: null,
  loading: false,
  error: null,
  hasLoggedOut: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    restartValue: (state) => {
      (state.profileResponse = null)
    },
    hasLoggedOutFn: (state: ProfileResponseState, action: PayloadAction<boolean>) => {
      state.hasLoggedOut = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<ProfileDataResponse>) => {
        (state.loading = false), (state.profileResponse = action.payload)
      })
      .addCase(fetchProfileData.rejected, (state) => {
        (state.loading = false), (state.error = "Error fetching User Profile Data")
      })
  }
})

export const { restartValue, hasLoggedOutFn } = userSlice.actions
export default userSlice.reducer;