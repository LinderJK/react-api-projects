import { Character } from '../../types/Character.ts';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { characterAPI } from '../../services/CharacterService.ts';
import { HYDRATE } from 'next-redux-wrapper';

export interface ICharacterState {
    characters: Character[];
    isLoading: boolean;
    error: Error | string;
    isDetailsOpen: boolean;
}

const initialState: ICharacterState = {
    characters: [],
    isLoading: false,
    error: '',
    isDetailsOpen: false,
};
export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setCharacters(state, action: PayloadAction<Character[]>) {
            state.characters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction) => {
            return {
                ...state,
                ...(action.payload?.character ?? {}),
            };
        });
        builder.addMatcher(characterAPI.endpoints?.getCharactersByPage.matchFulfilled, (state, { payload }) => {
            state.characters = payload.results;
            state.isLoading = false;
        });
        builder.addMatcher(characterAPI.endpoints?.getCharactersByPage.matchPending, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(characterAPI.endpoints?.getCharactersByPage.matchRejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message || 'An error occurred';
        });
    },
});

export const { setCharacters } = characterSlice.actions;

export default characterSlice.reducer;
