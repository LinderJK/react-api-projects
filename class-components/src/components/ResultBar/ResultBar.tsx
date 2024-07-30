import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
// import { useGetCharactersByPageQuery } from '../../services/CharacterService.ts';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useAppSelector } from '../../hooks/redux.ts';
// import { wrapper } from '../../store/store.ts';
import { Character } from '../../types/Character.ts';

interface ResultBarProps {
    results: Character[];
}

export default function ResultBar({ results }: ResultBarProps) {
    // const router = useRouter();
    // const { query } = router;
    // const { name, page } = query;
    // const { hydrating } = wrapper.useHydration(props);

    // const searchQuery = (name ?? '') as string;
    // const currentPage = parseInt(page as string, 10) || 1;
    // const { renderData, isLoading, error, refetch } = useGetCharactersByPageQuery({
    //     page: currentPage,
    //     name: searchQuery,
    // });

    // const { characters, isLoading, error, isDetailsOpen } = useAppSelector((state) => state.character);
    // console.log(characters);

    // useEffect(() => {
    //     refetch();
    // }, [query, refetch]);

    // if (error) {
    //     return <h2 className={styles.error}>{'Results not found'}</h2>;
    // }
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    const renderData = results.length > 0 ? results : null;

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar}>
            {renderData ? (
                renderData.map((result) => <CharacterCard key={result.id} character={result}></CharacterCard>)
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
