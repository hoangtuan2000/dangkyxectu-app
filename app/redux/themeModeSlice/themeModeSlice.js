import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

export const themeModeSlice = createSlice({
  name: 'themeModeRedux',
  initialState,
  reducers: {
    changeThemeMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const {changeThemeMode} = themeModeSlice.actions;

export default themeModeSlice.reducer;
