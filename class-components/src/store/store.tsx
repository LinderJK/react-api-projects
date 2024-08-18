import { configureStore } from '@reduxjs/toolkit';
import countrySlice from '../features/countrySlice.ts';
import formsSlice from '../features/formsSlice.ts';

export const store = configureStore({
    reducer: {
        country: countrySlice,
        forms: formsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
