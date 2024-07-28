import { createSlice } from '@reduxjs/toolkit';
import { characterAPI } from '../../services/CharacterService.ts';

export interface ISearchState {
    maxPages: number;
}

const initialState: ISearchState = {
    maxPages: 0,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(characterAPI.endpoints?.getCharactersByPage.matchFulfilled, (state, { payload }) => {
            state.maxPages = payload.info.pages;
        });
    },
});

export default searchSlice.reducer;
