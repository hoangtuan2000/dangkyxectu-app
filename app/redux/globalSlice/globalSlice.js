import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  errorAuthencation: null,
};

export const globalSlice = createSlice({
  name: 'globalRedux',
  initialState,
  reducers: {
    changeErrorAuthencation: (state, action) => {
      state.errorAuthencation = action.payload;
    },
  },
});

export const {changeErrorAuthencation} = globalSlice.actions;

export default globalSlice.reducer;
