import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { Character } from '../../types/Character.ts';

interface ResultBarProps {
    results: Character[];
}

export default function ResultBar({ results }: ResultBarProps) {
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
