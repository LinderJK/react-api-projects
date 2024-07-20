import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { setCurrentPage, setSearchQuery } from '../../store/reducers/SearchSlice.ts';
import useLocalStorage from '../../hooks/useLocalStorage.ts';

export default function SearchBar() {
    const { query, setQuery } = useLocalStorage();
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.search);
    const [inputValue, setInputValue] = useState(searchQuery);
    const [errorBoundary, setErrorBoundary] = useState(false);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (query) {
            dispatch(setSearchQuery(query));
            dispatch(setCurrentPage(1));
        }
    }, [query, dispatch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };
    const handleSearch = () => {
        setQuery(inputValue);
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
