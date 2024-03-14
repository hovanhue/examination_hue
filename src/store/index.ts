import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { AuthState } from './auth/auth.type';
import notificationSlice from './notification/notification.reducer';
import authSlice from './auth/auth.reducer';
import productSlice from './product/product.reducer';

const createNoopStorage = () => ({
  // eslint-disable-next-line no-unused-vars
  getItem(_key: any) {
    return Promise.resolve(null);
  },
  // eslint-disable-next-line no-unused-vars
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  // eslint-disable-next-line no-unused-vars
  removeItem(_key: any) {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    authSlice: persistReducer<AuthState>(authPersistConfig, authSlice),
    notificationSlice,
    productSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
