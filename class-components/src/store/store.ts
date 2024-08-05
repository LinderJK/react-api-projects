import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './reducers/CharacterSlice.ts';
import { characterAPI } from '../services/CharacterService.ts';
import searchReducer from './reducers/SearchSlice.ts';
import favoriteReducer from './reducers/FavoriteSlice.ts';
import detailsReducer from './reducers/DetailsSlice.ts';
import logger from 'redux-logger';
import { store } from 'next/dist/build/output/store';
import { useStore } from 'react-redux';
import { AppStore } from '../tests/testStore/setupStore.ts';

export const makeStore = () => {
    return configureStore({
        reducer: {
            character: characterReducer,
            [characterAPI.reducerPath]: characterAPI.reducer,
            search: searchReducer,
            favorite: favoriteReducer,
            details: detailsReducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(characterAPI.middleware, ...(process.browser ? [logger] : [])),
    });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppStore = useStore.withTypes<AppStore>();
