import React from 'react';
import { Character } from '../../types/Character.ts';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';

interface ResultsProps {
    results: Character[];
}

class ResultBar extends React.Component<ResultsProps> {
    render() {
        const { results } = this.props;
        return (
            <div>
                {results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.id} style={{ margin: '20px' }}>
                            <CharacterCard result={result}></CharacterCard>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        );
    }
}

export default ResultBar;
