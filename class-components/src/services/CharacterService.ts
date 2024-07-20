import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterResponse } from '../types/Character.ts';

export const characterAPI = createApi({
    reducerPath: 'characterAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/',
    }),
    endpoints: (build) => ({
        // getAllCharacter: build.query<CharacterResponse, void>({
        //     query: () => 'character',
        // }),
        // getCharacter: build.query<CharacterResponse, string>({
        //     query: (id) => `/character/${id}`,
        // }),
        // getCharacterByName: build.query<CharacterResponse, string>({
        //     query: (name) => `/character/?name=${name}`,
        // }),
        getCharactersByPage: build.query<CharacterResponse, { page: number; name: string }>({
            query: ({ page, name }) => `/character?page=${page ? page : 1}&name=${name ? name : ''}`,
        }),
    }),
});

export const {
    // useGetAllCharacterQuery,
    // useGetCharacterQuery,
    // useGetCharacterByNameQuery,
    useGetCharactersByPageQuery,
} = characterAPI;
