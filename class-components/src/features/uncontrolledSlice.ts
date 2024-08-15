import { IFormData } from '../types/forms.ts';
import { PayloadAction } from '@reduxjs/toolkit';

export const uncontrolledSlice = {
    name: 'uncontrolled',
    initialState: null as unknown as IFormData,
    reducers: {
        setControlledData: (state: IFormData, action: PayloadAction<IFormData>) => {
            state = action.payload;
        },
    },
};
