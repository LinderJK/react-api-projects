import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { CharacterResponse } from '../../types/Character.ts';

interface IResultBarProps {
    data: CharacterResponse;
}

export default function ResultBar({ data }: IResultBarProps) {
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
