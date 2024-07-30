import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { characterAPI } from '../../services/CharacterService.ts';

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
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction) => {
            return {
                ...state,
                ...(action.payload?.details ?? {}),
            };
        });
        builder.addMatcher(characterAPI.endpoints?.getCharacterById.matchFulfilled, (state, { payload }) => {
            state.detailsItem = payload;
        });
    },
});

export const { addDetailsItem } = detailsSlice.actions;

export default detailsSlice.reducer;
