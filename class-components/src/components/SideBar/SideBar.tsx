import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import { Character } from '../../types/Character.ts';

export default function SideBar() {
    const [data, setData] = useState<Character>();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams();
    console.log(id, 'ID');

    useEffect(() => {
        const getSidebarData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                console.log(response, 'response');
                if (response.data) {
                    setData(response.data);
                }
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    setError(error.response?.data.error || 'An error occurred');
                } else {
                    setError('An unexpected error occurred');
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };
        getSidebarData();
    }, [id]);

    return (
        <div className={styles.detailsContainer}>
            {error && <div>{error}</div>}
            {loading && <div>loading...</div>}
            {data && <CharacterCard character={data} />}
        </div>
    );
}
