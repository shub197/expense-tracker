import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DateState {
    expenseDate: string | null
}

const initialState: DateState = {
    expenseDate: null
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setExpenseDate: (state, action: PayloadAction<string | null>) => {
            state.expenseDate = action.payload;
        }
    }
})

export const { setExpenseDate } = dateSlice.actions;
export default dateSlice.reducer;
