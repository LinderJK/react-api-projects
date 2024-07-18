import { render, screen } from '@testing-library/react';
import ResultBar from '../components/ResultBar/ResultBar';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

const data = [
    {
        id: 1,
        name: 'Character 1',
        status: 'Dead',
        species: 'Human',
        type: 'Type 1',
        gender: 'Male',
        origin: {
            name: 'Origin 1',
            url: 'https://example.com/origin-1',
        },
        image: 'https://example.com/image-1',
        episode: ['https://example.com/episode-1', 'https://example.com/episode-2'],
        url: 'https://example.com/character-1',
        created: 1234567890,
    },
    {
        id: 2,
        name: 'Character 2',
        status: 'Alive',
        species: 'Human',
        type: 'Type 2',
        gender: 'Female',
        origin: {
            name: 'Origin 2',
            url: 'https://example.com/origin-2',
        },
        image: 'https://example.com/image-2',
        episode: ['https://example.com/episode-2', 'https://example.com/episode-2'],
        url: 'https://example.com/character-2',
        created: 1234567890,
    },
];

describe('ResultBar Component', () => {
    test('Отображает указанное количество карт', { retry: 2 }, () => {
        render(
            <MemoryRouter>
                <ResultBar results={data} error={null} isLoading={false} data-testid="result-bar" />
            </MemoryRouter>,
        );
        data.forEach((character) => {
            expect(screen.getByText(character.name)).toBeInTheDocument();
        });
    });

    test('Отображает сообщение при отсутствии карт', () => {
        render(<ResultBar results={[]} error={null} isLoading={false} />);
        expect(screen.getByText('No results found.')).toBeInTheDocument();
    });

    test('Отображает сообщение об ошибке', () => {
        const errorMessage = 'An error occurred';
        render(<ResultBar results={[]} error={errorMessage} isLoading={false} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('Отображает индикатор загрузки', () => {
        render(<ResultBar results={[]} error={null} isLoading={true} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
