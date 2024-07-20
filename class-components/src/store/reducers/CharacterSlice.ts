import { Character } from '../../types/Character.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { characterAPI } from '../../services/CharacterService.ts';

export interface ICharacterState {
    characters: Character[];
    isLoading: boolean;
    error: Error | string;
    selectedIds: Array<number>;
    isDetailsOpen: boolean;
}

const initialState: ICharacterState = {
    characters: [],
    isLoading: false,
    error: '',
    selectedIds: [],
    isDetailsOpen: false,
};

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setCharacters(state, action: PayloadAction<Character[]>) {
            state.characters = action.payload;
        },
        selectCharacter(state, action: PayloadAction<number>) {
            state.selectedIds.push(action.payload);
        },
        unselectCharacter(state, action: PayloadAction<number>) {
            state.selectedIds = state.selectedIds.filter((id) => id !== action.payload);
        },
        // selectAllCharacter(state, action: PayloadAction<Character>) {
        //     state.selected.push(action.payload);
        // },
        // deleteCharacter(state, action: PayloadAction<Character>) {
        //     state.selected = state.selected.filter((item) => item.id !== action.payload.id);
        // },
        // deleteAllCharacter(state) {
        //     state.selected = [];
        // },
    },
    extraReducers: (builder) => {
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

export const { setCharacters, selectCharacter, unselectCharacter } = characterSlice.actions;

export default characterSlice.reducer;
