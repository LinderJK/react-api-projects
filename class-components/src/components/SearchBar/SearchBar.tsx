import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

interface ISearchBarProps {
    query: string;
    onSearch: (query: string) => void;
}

export default function SearchBar({ query, onSearch }: ISearchBarProps) {
    const [inputValue, setInputValue] = useState(query);
    const [errorBoundary, setErrorBoundary] = useState(false);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const handleSearch = () => {
        onSearch(inputValue.trim());
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
