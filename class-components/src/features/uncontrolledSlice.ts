import { IFormData } from '../types/forms.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const uncontrolledSlice = createSlice({
    name: 'uncontrolled',
    initialState: [] as IFormData[],
    reducers: {
        setUncontrolledData: (state: IFormData[], action: PayloadAction<IFormData>) => {
            state.push(action.payload);
        },
    },
});

export const { setUncontrolledData } = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
