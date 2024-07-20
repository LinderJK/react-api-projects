import useLocalStorage from '../../hooks/useLocalStorage.ts';
import TitleBar from '../../components/TitleBar/TitleBar.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './mainpage.module.css';
import Pagination from '../../components/Pagination/Pagination.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { setSearchQuery } from '../../store/reducers/SearchSlice.ts';

function MainPage() {
    const dispatch = useAppDispatch();

    const { query } = useLocalStorage();
    if (query) {
        console.log('Search query is ' + query);
        dispatch(setSearchQuery(query));
    }

    const { currentPage, searchQuery } = useAppSelector((state) => state.search);
    const { error } = useAppSelector((state) => state.character);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     if (query) {
    //         dispatch(setSearchQuery(query));
    //     }
    // }, []);

    useEffect(() => {
        if (!searchParams.get('page')) {
            dispatch(setSearchQuery(searchParams.get('name') || ''));
        }
    }, [searchParams, dispatch]);

    useEffect(() => {
        setSearchParams({ name: searchQuery, page: currentPage.toString() });
    }, [searchQuery, currentPage, setSearchParams]);

    const handleClose = () => {
        if (location.pathname.startsWith('/details/')) {
            navigate(`/?name=${searchQuery}&page=${currentPage}`);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.left} onClick={handleClose}>
                <div className={styles.header}>
                    <TitleBar />
                    <SearchBar />
                    {!error && <Pagination />}
                </div>
                <ResultBar searchQuery={searchQuery} currentPage={currentPage}></ResultBar>
            </div>
            <Outlet></Outlet>
        </div>
    );
}

export default MainPage;
