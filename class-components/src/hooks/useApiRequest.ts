import { useEffect, useState } from 'react';
import { Character } from '../types/Character.ts';
import axios, { isAxiosError } from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export function useApiRequest(query: string, page: number) {
    const [data, setData] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pages, setPages] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/?name=${query}&page=${page}`);
                setData(response.data.results);
                setPages(response.data.info.pages);
                setError(null);
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
        fetchData();
    }, [query, page]);

    return { data, loading, error, pages };
}
