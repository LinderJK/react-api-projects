import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharacterResponse } from '../types/Character.ts';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
    return action.type === HYDRATE;
}

export const characterAPI = createApi({
    reducerPath: 'characterAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/',
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getCharacterById: build.query<Character, string>({
            query: (id) => `/character/${id}`,
        }),
        getCharactersByPage: build.query<CharacterResponse, { page: string; name: string }>({
            query: ({ page, name }) => `/character?page=${page ?? 1}&name=${name ?? ''}`,
        }),
    }),
});

export const { useGetCharacterByIdQuery, useGetCharactersByPageQuery } = characterAPI;
