'use client';
import { ChangeEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import { useRouter } from 'next/router';

export default function SearchBar() {
    const { query, setQuery } = useLocalStorage();
    const [inputValue, setInputValue] = useState(query ?? '');
    const [errorBoundary, setErrorBoundary] = useState(false);
    const router = useRouter();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };
    const handleSearch = () => {
        setQuery(inputValue);
        router.push({
            pathname: '/character/',
            query: {
                page: 1,
                name: inputValue,
            },
        });
    };

    const handleError = () => {
        setErrorBoundary(!errorBoundary);
    };

    return (
        <div className={styles.searchBar}>
            {errorBoundary ? (
                <div className={styles.errorContainer}>
                    <h2 className={styles.errorText}>Oops! Render Error :(</h2>
                    <button className={styles.retryButton} onClick={handleError}>
                        Retry
                    </button>
                </div>
            ) : (
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
            )}
        </div>
    );
}
