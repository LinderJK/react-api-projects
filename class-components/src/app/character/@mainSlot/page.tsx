import React from 'react';
import { CharacterResponse } from '../../../types/Character.ts';
import ResultBar from '../../../components/ResultBar/ResultBar.tsx';

async function getCharacters(name: string = '', page: string = '1') {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`, {
        cache: 'no-store',
    });
    const characters: CharacterResponse = await res.json();
    return characters;
}

interface CharacterPageProps {
    params?: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

async function CharacterPage({ searchParams }: CharacterPageProps) {
    // console.log(searchParams, params, 'MY PARAMS');
    const name = (searchParams?.name as string) ?? '';
    const page = (searchParams?.page as string) ?? '1';
    const data = await getCharacters(name, page);

    return (
        <React.Fragment>
            <ResultBar data={data}></ResultBar>
        </React.Fragment>
    );
}

export default CharacterPage;
