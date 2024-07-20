import React from 'react';

const Pagination = () => {
    return (
        <div>
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
        </div>
    );
};

export default Pagination;
