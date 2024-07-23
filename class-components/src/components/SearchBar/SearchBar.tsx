import { useState } from 'react';
import styles from './SearchBar.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const { query, setQuery } = useLocalStorage();
    const [inputValue, setInputValue] = useState(query || '');
    const [errorBoundary, setErrorBoundary] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };
    const handleSearch = () => {
        setQuery(inputValue);
        navigate(`/?name=${inputValue}&page=1`);
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
