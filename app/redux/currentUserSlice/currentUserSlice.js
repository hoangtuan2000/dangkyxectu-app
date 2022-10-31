import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const currentUserSlice = createSlice({
  name: 'currentUserRedux',
  initialState,
  reducers: {
    changeCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    deleteCurrentUser: (state, action) => {
      state.user = {};
    },
  },
});

export const {changeCurrentUser, deleteCurrentUser} = currentUserSlice.actions;

export default currentUserSlice.reducer;
