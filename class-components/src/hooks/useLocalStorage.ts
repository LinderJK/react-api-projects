import { useEffect, useState } from 'react';

const SEARCH_QUERY_KEY = 'searchQuery';

export function useLocalStorage() {
    const [query, setQuery] = useState<string>(() => {
        return localStorage.getItem(SEARCH_QUERY_KEY) || '';
    });

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
