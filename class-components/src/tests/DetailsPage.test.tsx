import { describe, expect, test } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import MainPage from '../pages/MainPage/MainPage.tsx';

const data = {
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
        renderWithProviders(
            <MemoryRouter initialEntries={[`/details/1`]}>
                <Routes>
                    <Route path="/details/:id" element={<DetailsPage />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            const title = screen.getByText('Details');
            expect(title).toBeInTheDocument();

            const nameElement = screen.getByText(`Gender - ${data.gender}`);
            expect(nameElement).toBeInTheDocument();
            const statusElement = screen.getByText(`Status - ${data.status}`);
            expect(statusElement).toBeInTheDocument();
            const speciesElement = screen.getByText(`Species - ${data.species}`);
            expect(speciesElement).toBeInTheDocument();
            const typeElement = screen.getByText(`Type - ${data.type}`);
            expect(typeElement).toBeInTheDocument();
        });
    });

    test('Handles button close click to navigate', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={[`/details/1?name=Rick&page=1`]}>
                <Routes>
                    <Route path="/details/:id" element={<DetailsPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </MemoryRouter>,
        );

        const closeButton = screen.getByText('Close');
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        await waitFor(() => {
            const sidebarElement = screen.queryByText('Details');
            expect(sidebarElement).not.toBeInTheDocument();
        });
    });
});
