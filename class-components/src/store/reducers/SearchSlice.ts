import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
    searchQuery: string;
    currentPage: number;
}

const initialState: ISearchState = {
    searchQuery: '',
    currentPage: 1,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const { setSearchQuery, setCurrentPage } = searchSlice.actions;

export default searchSlice.reducer;
