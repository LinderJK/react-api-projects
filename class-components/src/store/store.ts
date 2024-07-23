import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './reducers/CharacterSlice.ts';
import { characterAPI } from '../services/CharacterService.ts';
import searchReducer from './reducers/SearchSlice.ts';
import favoriteSlice from './reducers/FavoriteSlice.ts';
import detailsSlice from './reducers/DetailsSlice.ts';

export const store = configureStore({
    reducer: {
        character: characterReducer,
        [characterAPI.reducerPath]: characterAPI.reducer,
        search: searchReducer,
        favorite: favoriteSlice,
        details: detailsSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(characterAPI.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
