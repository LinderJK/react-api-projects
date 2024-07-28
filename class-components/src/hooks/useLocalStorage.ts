'use client';

import { useEffect, useState } from 'react';

const SEARCH_QUERY_KEY = 'searchQuery';

export function useLocalStorage() {
    const [query, setQuery] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(SEARCH_QUERY_KEY) || '';
        }
        return '';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(SEARCH_QUERY_KEY, query);
        }
    }, [query]);

    return { query, setQuery };
}

export default useLocalStorage;
