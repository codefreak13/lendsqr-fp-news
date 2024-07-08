import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  userToken: string;
}

const initialState: AuthState = {
  userToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userToken = action.payload;
    },
    clearUserInfo(state) {
      state.userToken = '';
    },
  },
});

export const {setUserInfo, clearUserInfo} = authSlice.actions;

export default authSlice.reducer;
