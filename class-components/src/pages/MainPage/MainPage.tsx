import TitleBar from '../../components/TitleBar/TitleBar.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './MainPage.module.css';
import Pagination from '../../components/Pagination/Pagination.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { setCurrentPage, setSearchQuery } from '../../store/reducers/SearchSlice.ts';

function MainPage() {
    const dispatch = useAppDispatch();

    const { currentPage, searchQuery } = useAppSelector((state) => state.search);

    const { error } = useAppSelector((state) => state.character);

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const location = useLocation();
    const name = searchParams.get('name') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        if (searchQuery !== name || currentPage !== page) {
            setSearchParams({ name: searchQuery, page: currentPage.toString() });
        }
    }, [searchQuery, currentPage]);

    useEffect(() => {
        if (searchQuery !== name) {
            dispatch(setSearchQuery(name));
        }

        if (currentPage !== page) {
            dispatch(setCurrentPage(page));
        }
    }, [searchParams]);

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
