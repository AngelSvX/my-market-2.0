import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../../features/auth/login/model/slice'
import postsReducer from '../../features/market-place/posts/model/slice'
import commentsReducer from '../../features/market-place/comments/model/slice'
import userReducer from '../../features/market-place/user/model/slice'
import categoriesReducer from '../../features/market-place/categories/model/slice'
import cartReducer from '../../features/market-place/cart/model/slice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    posts: postsReducer,
    comments: commentsReducer,
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch