import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { Character } from '../../types/Character.ts';
import { useRouter } from 'next/router';

interface ResultBarProps {
    results: Character[];
}

export default function ResultBar({ results }: ResultBarProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
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
