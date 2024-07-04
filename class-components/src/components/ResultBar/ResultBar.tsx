import React from 'react';
import { Character } from '../../types/Character.ts';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import styles from './ResultBar.module.css';

interface ResultsProps {
    results: Character[];
}

class ResultBar extends React.Component<ResultsProps> {
    render() {
        const { results } = this.props;
        return (
            <div>
                <div style={{ margin: '20px' }} className={styles.resultBar}>
                    {results.length > 0 ? (
                        results.map((result) => <CharacterCard key={result.id} result={result}></CharacterCard>)
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default ResultBar;
