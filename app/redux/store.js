'use client'

import { configureStore } from '@reduxjs/toolkit';
import collegePredictorReducer from '../../features/collegePredictor/collegePredictorSlice';

export const store = configureStore({
  reducer: {
    collegePredictor: collegePredictorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});