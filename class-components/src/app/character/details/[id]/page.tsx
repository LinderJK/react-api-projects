import React from 'react';
import { Character } from '../../../../types/Character.ts';
import SideBar from '../../../../components/SideBar/SideBar.tsx';

async function getCharacterByID(id: string) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const characters: Character = await res.json();
    return characters;
}

const DetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data = await getCharacterByID(id);
    return (
        <React.Fragment>
            <h1>Details</h1>
            <SideBar dataDetails={data}></SideBar>
        </React.Fragment>
    );
};

export default DetailsPage;
