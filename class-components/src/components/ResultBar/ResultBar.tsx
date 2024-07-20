import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';
import { characterAPI } from '../../services/CharacterService.ts';

interface IResultBarProps {
    searchQuery: string;
    currentPage: number;
}

export default function ResultBar({ searchQuery, currentPage }: IResultBarProps) {
    // const dispatch = useAppDispatch();
    const { data, isLoading, error } = characterAPI.useGetCharactersByPageQuery({
        page: currentPage,
        name: searchQuery,
    });

    // useEffect(() => {
    //     if (data?.results) {
    //         dispatch(setCharacters(data.results));
    //     }
    // }, [data, dispatch]);

    console.log(data, 'character query loaded');
    if (error) {
        return <h2 className={styles.error}>{'An error occurred'}</h2>;
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
