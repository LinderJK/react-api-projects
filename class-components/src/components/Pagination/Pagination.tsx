import styles from './pagination.module.css';
// import { useAppSelector } from '../../hooks/redux.ts';
import { useRouter } from 'next/router';
// import { useSearchParams } from 'next/navigation';

type Props = {
    currentPage: number;
    maxPages: number;
};

const Pagination = ({ currentPage, maxPages }: Props) => {
    // const { currentPage, maxPages } = useAppSelector((state) => state.search);
    // const [, setSearchParams] = useSearchParams();
    const router = useRouter();
    const { query } = router;
    // console.log(query, router);

    const handleSetPage = (page: number) => {
        const searchQuery = query.name ? `&name=${query.name}` : '';
        router.push(`/character/?page=${page}${searchQuery}`);
    };

    return (
        <>
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
        </>
    );
};

export default Pagination;
