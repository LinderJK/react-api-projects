import { combineReducers, configureStore } from '@reduxjs/toolkit';
import characterReducer from '../../store/reducers/CharacterSlice.ts';
import { characterAPI } from '../../services/CharacterService.ts';
import searchReducer from '../../store/reducers/SearchSlice.ts';
import { favoriteSlice } from '../../store/reducers/FavoriteSlice.ts';
import { detailsSlice } from '../../store/reducers/DetailsSlice.ts';

const rootReducer = combineReducers({
    character: characterReducer,
    [characterAPI.reducerPath]: characterAPI.reducer,
    search: searchReducer,
    favorite: favoriteSlice,
    details: detailsSlice,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(characterAPI.middleware);
        },
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
