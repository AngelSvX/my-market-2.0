import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../../features/auth/login/model/slice'
import postsReducer from '../../features/market-place/model/slice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    posts: postsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch