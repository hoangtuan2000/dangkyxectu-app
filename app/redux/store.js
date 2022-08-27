import { configureStore } from '@reduxjs/toolkit'
import themeModeReducer from './themeModeSlice/themeModeSlice'

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
  },
})