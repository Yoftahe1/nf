import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './slice/auth';
import { userApi } from './services/user';
import { courseApi } from './services/course';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token']
}


const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(userApi.middleware, courseApi.middleware),
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: false,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
