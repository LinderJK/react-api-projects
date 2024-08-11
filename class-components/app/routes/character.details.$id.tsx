import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { Character } from '../../src/types/Character';
import SideBar from '../../src/components/SideBar/SideBar';

type LoaderData = {
    data: Character;
    error: string | null;
};

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${params.id}`);
        return json<LoaderData>({
            data: response.data,
            error: null,
        });
    } catch (error) {
        return json<LoaderData>({
            data: null,
            error: 'Error loading data',
        });
    }
};

function DetailsPage() {
    const { data } = useLoaderData<LoaderData>();

    return (
        <>
            <h1>Details</h1>
            <SideBar dataDetails={data}></SideBar>
        </>
    );
}

export default DetailsPage;
