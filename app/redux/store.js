import { configureStore } from '@reduxjs/toolkit'
import filterReportReducer from './filterReport/filterReportSlice'

export const store = configureStore({
  reducer: {
    filterReportRedux: filterReportReducer,
  },
})