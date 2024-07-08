import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VIEW_TYPE} from '../../types';

interface ViewTypeState {
  viewType: keyof typeof VIEW_TYPE;
}

const initialState: ViewTypeState = {
  viewType: VIEW_TYPE.list,
};

const viewTypeSlice = createSlice({
  name: 'viewType',
  initialState,
  reducers: {
    setViewType(state, action: PayloadAction<VIEW_TYPE>) {
      state.viewType = action.payload;
    },
    toggleViewType(state) {
      state.viewType =
        state.viewType === VIEW_TYPE.list ? VIEW_TYPE.grid : VIEW_TYPE.list;
    },
  },
});

export const {setViewType, toggleViewType} = viewTypeSlice.actions;

export default viewTypeSlice.reducer;
