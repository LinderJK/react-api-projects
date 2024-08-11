import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { CharacterResponse } from '../../types/Character.ts';
import { useLocation, useNavigate, useNavigation } from '@remix-run/react';

interface IResultBarProps {
    data: CharacterResponse;
}

export default function ResultBar({ data }: IResultBarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();
    const handleClick = () => {
        if (location.pathname.includes('/details')) navigate(`/character/${location.search}`);
    };

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar} onClick={handleClick}>
            {navigation.state === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <>
                    {!!data?.results && data.results.length > 0 ? (
                        data.results.map((result) => <CharacterCard key={result.id} character={result}></CharacterCard>)
                    ) : (
                        <p>No results found.</p>
                    )}
                </>
            )}
        </div>
    );
}
