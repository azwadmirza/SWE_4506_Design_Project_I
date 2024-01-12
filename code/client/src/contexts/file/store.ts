import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './slice';

export const store = configureStore({
  reducer: {
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

