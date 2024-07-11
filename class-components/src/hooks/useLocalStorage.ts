import { useEffect, useState } from 'react';

const SEARCH_QUERY_KEY = 'searchQuery';

export function useLocalStorage() {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const query = localStorage.getItem(SEARCH_QUERY_KEY) || '';
        if (query) {
            setQuery(query);
        }
    }, []);

    useEffect(() => {
        const saveQuery = () => {
            localStorage.setItem(SEARCH_QUERY_KEY, query);
        };

        saveQuery();

        return () => {
            saveQuery();
        };
    }, [query]);

    return { query, setQuery };
}

export default useLocalStorage;
