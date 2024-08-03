'use client';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { Character } from '../../types/Character.ts';
import { usePathname, useRouter } from 'next/navigation';

interface ResultBarProps {
    results: Character[];
}

export default function ResultBar({ results }: ResultBarProps) {
    const renderData = results.length > 0 ? results : null;
    const path = usePathname();
    const router = useRouter();
    const isDetails = path.includes('details');

    const handleClick = () => {
        if (isDetails) {
            router.back();
        }
    };

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar} onClick={handleClick}>
            {renderData ? (
                renderData.map((result) => <CharacterCard key={result.id} character={result}></CharacterCard>)
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
