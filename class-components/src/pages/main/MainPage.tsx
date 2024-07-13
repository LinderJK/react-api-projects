import useLocalStorage from '../../hooks/useLocalStorage.ts';
import { useApiRequest } from '../../hooks/useApiRequest.ts';
import TitleBar from '../../components/TitleBar/TitleBar.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './mainpage.module.css';

function MainPage() {
    const { query, setQuery } = useLocalStorage();
    const [searchParams, setSearchParams] = useSearchParams({ name: query, page: '1' });
    const page = parseInt(searchParams.get('page') || '1', 10);
    const searchQuery = searchParams.get('name') || '';
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams({ page: '1' });
        }
    }, [searchParams, setSearchParams]);

    const { data, loading, error, pages } = useApiRequest(searchQuery, page);

    const handleSearch = (query: string) => {
        setQuery(query);
        setSearchParams({ name: query, page: '1' });
    };

    const handleNextPage = () => {
        if (pages) {
            const nextPage = page + 1;
            setSearchParams({ name: searchQuery, page: nextPage.toString() });
        }
    };
    const handlePreviousPage = () => {
        const prevPage = page > 1 ? page - 1 : 1;
        setSearchParams({ name: searchQuery, page: prevPage.toString() });
    };

    const handleClose = () => {
        if (location.pathname.startsWith('/details/')) {
            navigate(`/?name=${searchQuery}&page=${page}`);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.left} onClick={handleClose}>
                <div className={styles.header}>
                    <TitleBar />
                    <SearchBar onSearch={handleSearch} query={query} />
                </div>
                {!error && pages && (
                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage} disabled={page === 1}>
                            Previous
                        </button>

                        {pages && <div>{`${page} / ${pages}`}</div>}

                        <button onClick={handleNextPage} disabled={page === pages}>
                            Next
                        </button>
                    </div>
                )}
                <ResultBar results={data} error={error} isLoading={loading}></ResultBar>
            </div>
            <Outlet></Outlet>
        </div>
    );
}

export default MainPage;
