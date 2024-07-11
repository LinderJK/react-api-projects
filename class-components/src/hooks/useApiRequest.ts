import { useEffect, useState } from 'react';
import { Character } from '../types/Character.ts';
import axios, { isAxiosError } from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function useApiRequest(query: string = '') {
    const [data, setData] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/?name=${query}`);
                if (response) {
                    return response.data.results;
                }
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    setError(error.response?.data.error || 'An error occurred');
                } else {
                    setError('An unexpected error occurred');
                    console.error(error);
                }
                return [];
            }
        };
        fetchData()
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [query]);

    return { data, loading, error };
}
