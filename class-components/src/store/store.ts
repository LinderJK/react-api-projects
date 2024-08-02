import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './reducers/CharacterSlice.ts';
import { characterAPI } from '../services/CharacterService.ts';
import { searchSlice } from './reducers/SearchSlice.ts';
import { favoriteSlice } from './reducers/FavoriteSlice.ts';
import { detailsSlice } from './reducers/DetailsSlice.ts';
import logger from 'redux-logger';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { Reducer } from 'react';

export const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
    [characterSlice.name]: characterSlice.reducer,
    [characterAPI.reducerPath]: characterAPI.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [favoriteSlice.name]: favoriteSlice.reducer,
    [detailsSlice.name]: detailsSlice.reducer,
});

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;

export const makeStore: MakeStore<RootState> = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(characterAPI.middleware, ...(process.browser ? [logger] : [])),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
