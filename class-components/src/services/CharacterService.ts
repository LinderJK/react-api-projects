import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterResponse } from '../types/Character.ts';

export const characterAPI = createApi({
    reducerPath: 'characterAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/',
    }),
    endpoints: (build) => ({
        getCharacterById: build.query<CharacterResponse, string>({
            query: (id) => `/character/${id}`,
        }),
        getCharactersByPage: build.query<CharacterResponse, { page: number; name: string }>({
            query: ({ page, name }) => `/character?page=${page ? page : 1}&name=${name ? name : ''}`,
        }),
    }),
});

export const { useGetCharacterByIdQuery, useGetCharactersByPageQuery } = characterAPI;
