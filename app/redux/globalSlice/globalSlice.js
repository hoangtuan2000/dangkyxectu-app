import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  errorAuthencation: 'Phiên Đăng Nhập Của Bạn Đã Hết Hạn',
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
