import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
// import { characterAPI } from '../../services/CharacterService.ts';
import { Character } from '../../types/Character.ts';

interface IResultBarProps {
    character: Character[];
}

export default function ResultBar({ character }: IResultBarProps) {
    // const { data, isLoading, error } = characterAPI.useGetCharactersByPageQuery({
    //     page: currentPage,
    //     name: searchQuery,
    // });

    // if (error) {
    //     return <h2 className={styles.error}>{'Results not found'}</h2>;
    // }
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    // if (!character) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar}>
            {!!character && character.length > 0 ? (
                character.map((result) => <CharacterCard key={result.id} character={result}></CharacterCard>)
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
