import styles from './pagination.module.css';
import { useNavigate } from '@remix-run/react';
import { useLocation } from '@remix-run/react';

interface PaginationProps {
    currentPage: number;
    maxPages: number;
}

const Pagination = ({ currentPage, maxPages }: PaginationProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('page', newPage.toString());
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < maxPages) {
            const newPage = currentPage + 1;
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('page', newPage.toString());
            navigate(`${location.pathname}?${searchParams.toString()}`);
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
