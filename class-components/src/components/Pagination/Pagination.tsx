import styles from './pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { setCurrentPage } from '../../store/reducers/SearchSlice.ts';

const Pagination = () => {
    const dispatch = useAppDispatch();
    const { currentPage, maxPages } = useAppSelector((state) => state.search);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const handleNextPage = () => {
        if (currentPage < maxPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
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
