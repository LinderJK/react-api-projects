import { IFormData } from '../types/forms.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const formsSlice = createSlice({
    name: 'uncontrolled',
    initialState: [] as IFormData[],
    reducers: {
        setFormData: (state: IFormData[], action: PayloadAction<IFormData>) => {
            state.push(action.payload);
        },
    },
});

export const { setFormData } = formsSlice.actions;

export default formsSlice.reducer;
