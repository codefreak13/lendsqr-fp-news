import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character} from '../../types';

interface FavoriteState {
  favoriteList: Character[];
  favoriteListIds: string[];
}

const initialState: FavoriteState = {
  favoriteList: [],
  favoriteListIds: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteList(state, action: PayloadAction<Character[]>) {
      state.favoriteList = action.payload;
      state.favoriteListIds = action.payload.map(item => item.id);
    },
    addFavoriteItem(state, action: PayloadAction<Character>) {
      const item = action.payload;
      const exists = state.favoriteList.some(fav => fav.id === item.id);
      if (exists) {
        state.favoriteList = state.favoriteList.filter(
          fav => fav.id !== item.id,
        );
      } else {
        state.favoriteList.push(item);
      }
      state.favoriteListIds = state.favoriteList.map(fav => fav.id);
    },
    removeFavoriteItem(state, action: PayloadAction<Character>) {
      state.favoriteList = state.favoriteList.filter(
        fav => fav.id !== action.payload.id,
      );
      state.favoriteListIds = state.favoriteList.map(fav => fav.id);
    },
  },
});

export const {setFavoriteList, addFavoriteItem, removeFavoriteItem} =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
