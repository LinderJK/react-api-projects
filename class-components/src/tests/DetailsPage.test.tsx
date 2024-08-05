import { describe, expect, test } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import DetailsPage from '../app/character/details/[id]/page.tsx';

vi.mock('next/navigation', () => {
    return {
        __esModule: true,
        usePathname: () => ({
            pathname: '',
        }),
        useRouter: () => ({
            push: vi.fn(),
            replace: vi.fn(),
            prefetch: vi.fn(),
        }),
        useSearchParams: () => ({
            get: () => {},
        }),
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

export const handlers = [
    http.get('https://rickandmortyapi.com/api/character/1', () => {
        return HttpResponse.json(data);
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DetailsPage Component test', () => {
    test('Renders the DetailsPage component with "Details"', async () => {
        const params = { id: '1' };
        const Component = await DetailsPage({ params });
        renderWithProviders(Component);

        await waitFor(() => {
            const title = screen.getByText('Details');
            expect(title).toBeInTheDocument();
        });
    });
});
