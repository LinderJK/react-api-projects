import { createSlice } from '@reduxjs/toolkit';

export const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        detailsItem: {},
    },
    reducers: {
        addDetailsItem(state, action): void {
            state.detailsItem = action.payload;
        },
    },
});

export const { addDetailsItem } = detailsSlice.actions;

export default detailsSlice.reducer;
