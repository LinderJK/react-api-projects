import styles from './pagination.module.css';
import React from 'react';
import { useRouter } from 'next/router';
// import { useAppSelector } from '../../hooks/redux.ts';

const Pagination = ({ maxPages }: { maxPages: number }) => {
    // const { maxPages } = useAppSelector((state) => state.search);
    const router = useRouter();
    const { query } = router;
    const currentPage = parseInt(query.page as string, 10) || 1;

    const handleSetPage = (page: number) => {
        const searchQuery = query.name ? `&name=${query.name}` : '';
        router.push(`/character/?page=${page}${searchQuery}`);
    };

    return (
        <React.Fragment>
            {maxPages > 0 && (
                <div className={styles.pagination}>
                    <button onClick={() => handleSetPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>

                    <div>{`${currentPage} / ${maxPages}`}</div>

                    <button onClick={() => handleSetPage(currentPage + 1)} disabled={currentPage === maxPages}>
                        Next
                    </button>
                </div>
            )}
        </React.Fragment>
    );
};

export default Pagination;
