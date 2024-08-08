import { ChangeEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import { useNavigate } from '@remix-run/react';

export default function SearchBar() {
    const { query, setQuery } = useLocalStorage();
    const [inputValue, setInputValue] = useState(query || '');
    const [errorBoundary, setErrorBoundary] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.trim());
    };
    const handleSearch = () => {
        setQuery(inputValue);
        navigate({
            pathname: '/character',
            search: `?name=${inputValue}&page=1`,
        });
    };

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
