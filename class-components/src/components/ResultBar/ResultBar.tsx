import { Character } from '../../types/Character.ts';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';

interface ResultsProps {
    results: Character[];
    error: string | null;
    isLoading: boolean;
}

export default function ResultBar(props: ResultsProps) {
    const { results, error, isLoading } = props;

    if (error) {
        return <h2 className={styles.error}>{error}</h2>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ margin: '20px' }} className={styles.resultBar}>
            {results && results.length > 0 ? (
                results.map((result) => <CharacterCard key={result.id} result={result}></CharacterCard>)
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

// class ResultBar extends React.Component<ResultsProps> {
//     render() {
//         const { results, error, isLoading } = this.props;
//         if (error) {
//             return <h2 className={styles.error}>{error}</h2>;
//         }
//         if (isLoading) {
//             return <p>Loading...</p>;
//         }
//         return (
//             <div style={{ margin: '20px' }} className={styles.resultBar}>
//                 {results && results.length > 0 ? (
//                     results.map((result) => <CharacterCard key={result.id} result={result}></CharacterCard>)
//                 ) : (
//                     <p>No results found.</p>
//                 )}
//             </div>
//         );
//     }
// }
//
// export default ResultBar;
