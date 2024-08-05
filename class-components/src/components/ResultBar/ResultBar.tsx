'use client';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { Character, CharacterResponse } from '../../types/Character.ts';
import { usePathname, useRouter } from 'next/navigation';
import Pagination from '../Pagination/Pagination.tsx';

interface ResultBarProps {
    data: CharacterResponse;
}

export default function ResultBar({ data }: ResultBarProps) {
    const path = usePathname();
    const router = useRouter();
    const isDetails = path.includes('details');

    const handleClick = () => {
        if (isDetails) {
            router.back();
        }
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <Pagination maxPages={data.info.pages}></Pagination>
            <div style={{ margin: '20px' }} className={styles.resultBar}>
                {data && data.results ? (
                    data.results.map((data: Character) => (
                        <CharacterCard key={data.id} character={data}></CharacterCard>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}
