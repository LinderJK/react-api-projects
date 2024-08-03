import React from 'react';
import { CharacterResponse } from '../../types/Character.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';

async function getCharacters(name: string = '', page: string = '1') {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`);
    const characters: CharacterResponse = await res.json();
    return characters;
}

async function CharacterPage({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
    const name = searchParams?.name ?? '';
    const page = searchParams?.page ?? '1';
    const data = await getCharacters(name, page);

    return (
        <React.Fragment>
            <Pagination maxPages={data.info.pages}></Pagination>
            <ResultBar results={data.results}></ResultBar>
        </React.Fragment>
    );
}

export default CharacterPage;
