import {configureStore} from '@reduxjs/toolkit';
import themeModeReducer from './themeModeSlice/themeModeSlice';
import currentUserReducer from './currentUserSlice/currentUserSlice';
import globalReducer from './globalSlice/globalSlice';

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
    currentUser: currentUserReducer,
    global: globalReducer,
  },
});
