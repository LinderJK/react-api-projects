import styles from './pagination.module.css';
import { useAppSelector } from '../../hooks/redux.ts';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
    const { currentPage, maxPages } = useAppSelector((state) => state.search);
    const [, setSearchParams] = useSearchParams();

    const handlePreviousPage = () => {
        setSearchParams((prev) => {
            prev.set('page', (currentPage - 1).toString());
            return prev;
        });
    };

    const handleNextPage = () => {
        setSearchParams((prev) => {
            prev.set('page', (currentPage + 1).toString());
            return prev;
        });
    };

    return (
        <>
            {maxPages > 0 && (
                <div className={styles.pagination}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>

                    <div>{`${currentPage} / ${maxPages}`}</div>

                    <button onClick={handleNextPage} disabled={currentPage === maxPages}>
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
