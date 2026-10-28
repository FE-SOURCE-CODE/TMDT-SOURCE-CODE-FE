import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
  devTools: true,
});

if (typeof window !== 'undefined') {
  (window as any).store = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
