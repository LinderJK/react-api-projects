import { screen, waitFor } from '@testing-library/react';
import ResultBar from '../components/ResultBar/ResultBar';
import { describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';

const data = {
    info: {
        count: 2,
        pages: 2,
        next: 'https://rickandmortyapi.com/api/character/?page=2',
        prev: null,
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
    ],
};

export const handlers = [
    http.get('https://rickandmortyapi.com/api/character', ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        const page = url.searchParams.get('page');
        if (!name || !page) {
            return new HttpResponse(null, { status: 404 });
        }
        if (name === 'Rick' && page === '1') {
            return HttpResponse.json(data);
        }
        return new HttpResponse(null, { status: 404 });
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ResultBar Component test', () => {
    test('Displays the specified number of cards', { retry: 2 }, async () => {
        renderWithProviders(<ResultBar results={data.results} />);
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
        renderWithProviders(<ResultBar results={[]} />);
        await waitFor(() => {
            expect(screen.getByText('No results found.')).toBeInTheDocument();
        });
    });
});
