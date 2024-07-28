import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { useGetCharactersByPageQuery } from '../../services/CharacterService.ts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ResultBar() {
    const router = useRouter();
    const { query } = router;
    const { name, page } = query;

    const searchQuery = (name ?? '') as string;
    const currentPage = parseInt(page as string, 10) || 1;
    const { data, isLoading, error, refetch } = useGetCharactersByPageQuery({
        page: currentPage,
        name: searchQuery,
    });

    useEffect(() => {
        refetch();
    }, [query, refetch]);

    if (error) {
        return <h2 className={styles.error}>{'Results not found'}</h2>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar}>
            {!!data && data.results.length > 0 ? (
                data.results.map((result) => <CharacterCard key={result.id} character={result}></CharacterCard>)
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
