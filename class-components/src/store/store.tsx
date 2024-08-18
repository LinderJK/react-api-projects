import { configureStore } from '@reduxjs/toolkit';
import countrySlice from '../features/countrySlice.ts';
import uncontrolledSlice from '../features/formsSlice.ts';

export const store = configureStore({
    reducer: {
        country: countrySlice,
        forms: uncontrolledSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
