'use client';
import { ChangeEvent, useCallback, useState } from 'react';
import styles from './SearchBar.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const { query, setQuery } = useLocalStorage();
    const [inputValue, setInputValue] = useState(query ?? '');
    const [errorBoundary, setErrorBoundary] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    // const pathname = usePathname();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };
    const createQuery = useCallback(
        (name: string) => {
            setQuery(inputValue);
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', '1');
            params.set('name', name);
            return params.toString();
        },
        [searchParams, setQuery, inputValue],
    );
    const handleSearch = useCallback(() => {
        const query = createQuery(inputValue);
        router.push(`/character?${query}`);
    }, [createQuery, inputValue, router]);

    const handleError = () => {
        setErrorBoundary(!errorBoundary);
    };

    if (errorBoundary) {
        throw new Error('Test error for ErorrBoundary');
    }

    return (
        <div className={styles.searchBar}>
            <>
                <input
                    className={styles.input}
                    placeholder={'Input Character Name'}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleError}>Error!</button>
            </>
        </div>
    );
}
