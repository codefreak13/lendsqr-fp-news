import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {useDispatch} from 'react-redux';
import favoriteSlice from './slices/favoriteSlice';
import viewTypeSlice from './slices/viewTypeSlice';
import characterSlice from './slices/characterSlice';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import authSlice from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  favorites: favoriteSlice,
  viewType: viewTypeSlice,
  characters: characterSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
export const persistor = persistStore(store);
