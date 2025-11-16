import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../../features/auth/login/model/slice'
import postsReducer from '../../features/market-place/posts/model/slice'
import commentsReducer from '../../features/market-place/comments/model/slice'
import userReducer from '../../features/market-place/user/model/slice'
import categoriesReducer from '../../features/market-place/categories/model/slice'
import cartReducer from '../../features/market-place/cart/model/slice'
import paymentReducer from '../../features/market-place/payment/model/slice'
import registerReducer from '../../features/auth/register/model/slice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    posts: postsReducer,
    comments: commentsReducer,
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    payment: paymentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch