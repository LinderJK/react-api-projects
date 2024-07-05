import React from 'react';
import { Character } from '../../types/Character.ts';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';

interface ResultsProps {
    results: Character[];
    error: string | null;
}

class ResultBar extends React.Component<ResultsProps> {
    render() {
        const { results, error } = this.props;
        if (error) {
            return <h2 className={styles.error}>{error}</h2>;
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
}

export default ResultBar;
