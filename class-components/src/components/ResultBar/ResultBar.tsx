import React from 'react';
import { Character } from '../../types/Character.ts';

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
                        <div key={result.id} style={{ marginBottom: '10px' }}>
                            <h3>{result.name}</h3>
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
