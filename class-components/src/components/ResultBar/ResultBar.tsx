import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { characterAPI } from '../../services/CharacterService.ts';

interface IResultBarProps {
    searchQuery: string;
    currentPage: number;
}

export default function ResultBar({ searchQuery, currentPage }: IResultBarProps) {
    const { data, isLoading, error } = characterAPI.useGetCharactersByPageQuery({
        page: currentPage,
        name: searchQuery,
    });

    if (error) {
        return <h2 className={styles.error}>{'Results not found'}</h2>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar}>
            {!!data?.results && data.results.length > 0 ? (
                data.results.map((result) => <CharacterCard key={result.id} character={result}></CharacterCard>)
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
