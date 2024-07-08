import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Api from '../../api';
import {Character} from '../../types';

interface CharactersState {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  } | null;
  data: Character[];
  loading: boolean;
}

const initialState: CharactersState = {
  info: null,
  data: [],
  loading: true,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    const response = await Api.get(`/character?page=${page}`);
    return response.data;
  },
);
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = true;
          state.data = [...state.data, ...action.payload.results];
          state.loading = false;
        },
      )
      .addCase(fetchCharacters.rejected, state => {
        state.loading = false;
      });
  },
});

export default characterSlice.reducer;
