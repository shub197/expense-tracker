import { configureStore } from '@reduxjs/toolkit';
import expenseDateReducer from './slices/expenseDateSlice';

export const store = configureStore({
    reducer: {
        date: expenseDateReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;