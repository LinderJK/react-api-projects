import axios from 'axios';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CharacterResponse } from '../../src/types/Character';
import Pagination from '../../src/components/Pagination/Pagination';
import ResultBar from '../../src/components/ResultBar/ResultBar';
import { Outlet } from '@remix-run/react';
import styles from '../styles/styles.module.css';

type LoaderData = {
    searchQuery: string;
    currentPage: number;
    data: CharacterResponse;
    error: string | null;
};

export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
        return json<LoaderData>({
            searchQuery: name,
            currentPage: page,
            data: response.data,
            error: null,
        });
    } catch (error) {
        return json({
            searchQuery: name,
            currentPage: page,
            data: null,
            error: 'Error loading data',
        });
    }
};

export default function CharacterPage() {
    const { currentPage, data, error } = useLoaderData<LoaderData>();
    if (error) {
        return <h1>{error}</h1>;
    }
    if (!data) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className={styles.container}>
            <section className={styles.characterSection}>
                <Pagination currentPage={currentPage} maxPages={data.info.pages}></Pagination>
                <ResultBar data={data}></ResultBar>
            </section>
            <section className={styles.detailsSection}>
                <Outlet />
            </section>
        </div>
    );
}
