import { countryList } from '../utils/country.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
    country: string[];
}

const initialState: CountryState = {
    country: countryList,
};

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<string[]>) => {
            state.country = action.payload;
        },
    },
});

export const { setCountry } = countrySlice.actions;

export default countrySlice.reducer;
