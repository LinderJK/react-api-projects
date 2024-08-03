import { describe, expect, test } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import DetailsPage from '../pages/character/details/[id].tsx';
import mockRouter from 'next-router-mock';

const data = {
    dataDetails: {
        id: 1,
        name: 'Rick',
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
    dataMain: {
        info: {
            count: 2,
            pages: 2,
            next: 'https://rickandmortyapi.com/api/character/?page=2',
            prev: null,
        },
        results: [
            {
                id: 1,
                name: 'Rick',
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
    },
    initialState: {},
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
    beforeAll(() => {
        vi.mock('next/router', () => require('next-router-mock'));
    });
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });
    test('Renders the DetailsPage component with "Details"', async () => {
        renderWithProviders(<DetailsPage pageProps={data} />);

        await waitFor(() => {
            mockRouter.setCurrentUrl(`/character/details/${data.dataDetails.id}`);
        });

        await waitFor(() => {
            const title = screen.getByText('Details');
            expect(title).toBeInTheDocument();
            const nameElement = screen.getByText(`Gender - ${data.dataDetails.gender}`);
            expect(nameElement).toBeInTheDocument();
            const statusElement = screen.getByText(`Status - ${data.dataDetails.status}`);
            expect(statusElement).toBeInTheDocument();
            const speciesElement = screen.getByText(`Species - ${data.dataDetails.species}`);
            expect(speciesElement).toBeInTheDocument();
            const typeElement = screen.getByText(`Type - ${data.dataDetails.type}`);
            expect(typeElement).toBeInTheDocument();
        });
    });
});
