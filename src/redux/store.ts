// File: src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
