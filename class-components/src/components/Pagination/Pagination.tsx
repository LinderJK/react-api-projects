'use client';
import styles from './pagination.module.css';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Pagination = ({ maxPages }: { maxPages: number }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');
    const createQueryString = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', String(page));

            return params.toString();
        },
        [searchParams],
    );

    return (
        <React.Fragment>
            {maxPages > 0 && (
                <div className={styles.pagination}>
                    <Link href={`${pathname}?${createQueryString(currentPage - 1)}`}>
                        <button disabled={currentPage === 1}>Previous</button>
                    </Link>

                    <div>{`${currentPage ?? 1} / ${maxPages}`}</div>
                    <Link href={`${pathname}?${createQueryString(currentPage + 1)}`}>
                        <button disabled={currentPage === maxPages}>Next</button>
                    </Link>
                </div>
            )}
        </React.Fragment>
    );
};

export default Pagination;
