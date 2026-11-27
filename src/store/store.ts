import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/walletSlice';
import detailReducer from './slices/detailSlice';
import sellerReducer from './slices/sellerSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    detail: detailReducer,
    seller: sellerReducer,
  },
  devTools: true,
});

if (typeof window !== 'undefined') {
  (window as any).store = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
