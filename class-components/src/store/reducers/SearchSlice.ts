import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { characterAPI } from '../../services/CharacterService.ts';

export interface ISearchState {
    searchQuery: string;
    currentPage: number;
    maxPages: number;
}

const initialState: ISearchState = {
    searchQuery: '',
    currentPage: 1,
    maxPages: 0,
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
    extraReducers(builder) {
        builder.addMatcher(characterAPI.endpoints?.getCharactersByPage.matchFulfilled, (state, { payload }) => {
            state.maxPages = payload.info.pages;
        });
    },
});

export const { setSearchQuery, setCurrentPage } = searchSlice.actions;

export default searchSlice.reducer;
