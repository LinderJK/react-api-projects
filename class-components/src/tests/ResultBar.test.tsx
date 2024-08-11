import { screen, waitFor } from '@testing-library/react';
import ResultBar from '../components/ResultBar/ResultBar';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';

vi.mock('@remix-run/react', () => {
    return {
        useNavigate: () => vi.fn(),
        useLocation: () => ({
            pathname: '',
            search: '',
        }),
        useNavigation: () => {
            return {
                state: 'idle',
            };
        },
    };
});

const data = {
    info: {
        count: 2,
        pages: 3,
        next: 'https://rickandmortyapi.com/api/character/?page=2',
        prev: 'https://rickandmortyapi.com/api/character/?page=1',
    },
    results: [
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
    ],
};

afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
});

describe('ResultBar Component test', () => {
    test('Displays the specified number of cards', { retry: 2 }, async () => {
        renderWithProviders(<ResultBar data={data} />);
        await waitFor(() => {
            data.results.forEach((result) => {
                expect(screen.getByText(result.name)).toBeInTheDocument();
                const imageElement = screen.getByAltText(result.name);
                expect(imageElement).toBeInTheDocument();
                expect(imageElement).toHaveAttribute('src', result.image);
            });
            const cards = screen.getAllByText(/Character \d+/);
            expect(cards.length).toBe(data.results.length);
        });
    });

    test('Displays a message when there are no cards', async () => {
        renderWithProviders(<ResultBar data={{ ...data, results: [] }} />);
        await waitFor(() => {
            expect(screen.getByText('No results found.')).toBeInTheDocument();
        });
    });
});
