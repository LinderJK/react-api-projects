import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './reducers/CharacterSlice.ts';
import { characterAPI } from '../services/CharacterService.ts';
import { searchSlice } from './reducers/SearchSlice.ts';
import { favoriteSlice } from './reducers/FavoriteSlice.ts';
import { detailsSlice } from './reducers/DetailsSlice.ts';
import logger from 'redux-logger';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

const reducers = {
    [characterSlice.name]: characterSlice.reducer,
    [characterAPI.reducerPath]: characterAPI.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [favoriteSlice.name]: favoriteSlice.reducer,
    [detailsSlice.name]: detailsSlice.reducer,
};

const reducer = combineReducers(reducers);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeStore: MakeStore<any> = ({ reduxWrapperMiddleware }) =>
    configureStore({
        reducer,
        devTools: true,
        // middleware: (getDefaultMiddleware) => {
        //     return getDefaultMiddleware().concat(characterAPI.middleware);
        // },
        middleware: (getDefaultMiddleware) =>
            [
                ...getDefaultMiddleware(),
                process.browser ? logger : null,
                characterAPI.middleware,
                reduxWrapperMiddleware,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ].filter(Boolean) as any,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
