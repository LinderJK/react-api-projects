import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/Character.ts';

export interface ICharacterState {
    selected: Array<Character>;
    isLoading: boolean;
    error: Error | string;
}

const initialState: ICharacterState = {
    selected: [],
    isLoading: false,
    error: '',
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        selectCharacter(state, action: PayloadAction<Character>) {
            state.selected.push(action.payload);
        },
        unselectCharacter(state, action: PayloadAction<Character>) {
            state.selected = state.selected.filter((character) => character.id !== action.payload.id);
        },
        unselectAllCharacter(state) {
            state.selected = [];
        },
    },
});

export const { selectCharacter, unselectAllCharacter, unselectCharacter } = favoriteSlice.actions;

export default favoriteSlice.reducer;
