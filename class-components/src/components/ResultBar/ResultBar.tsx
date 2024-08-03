import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { Character } from '../../types/Character.ts';
import useLoader from '../../hooks/useLoader.ts';

interface ResultBarProps {
    results: Character[];
}

export default function ResultBar({ results }: ResultBarProps) {
    const { loading } = useLoader();
    const renderData = results.length > 0 ? results : null;

    if (loading) {
        return <p>Loading...</p>;
    }

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
