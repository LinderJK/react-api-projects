import { afterEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';

// const data = {
//     id: 1,
//     name: 'Rick',
//     status: 'Dead',
//     species: 'Human',
//     type: 'Type 1',
//     gender: 'Male',
//     origin: {
//         name: 'Origin 1',
//         url: 'https://example.com/origin-1',
//     },
//     image: 'https://example.com/image-1',
//     episode: ['https://example.com/episode-1', 'https://example.com/episode-2'],
//     url: 'https://example.com/character-1',
//     created: 1234567890,
// };

export const handlers = [
    http.get('/api/user', async () => {
        await delay(150);
        return HttpResponse.json();
    }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CharacterCard Component', () => {
    // beforeEach(() => {
    //     vi.resetAllMocks();
    // });
    //
    // afterEach(() => {
    //     vi.clearAllMocks();
    // });

    test('renders the CharacterCard component with title and image', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <CharacterCard character={data} />
            </MemoryRouter>,
        );
        const nameElement = screen.getByText(data.name);
        expect(nameElement).toBeInTheDocument();
        const imageElement = screen.getByAltText(data.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', data.image);
    });

    test('Переходит на страницу с подробной информацией при клике на карточку', async () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path={`/`} element={<CharacterCard character={data} />} />
                    <Route path={`/details/${data.id}`} element={<DetailsPage />} />
                </Routes>
            </MemoryRouter>,
        );

        const card = screen.getByText(data.name);
        fireEvent.click(card);

        await waitFor(() => {
            const detailsHeading = screen.getByRole('heading', { name: 'Details' });
            expect(detailsHeading).toBeInTheDocument();
        });
    });

    test('renders the DetailsPage component with "Details"', async () => {
        render(
            <MemoryRouter initialEntries={[`/details/${data.id}`]}>
                <Routes>
                    <Route path="/details/:id" element={<DetailsPage />} />
                </Routes>
            </MemoryRouter>,
        );

        await waitFor(() => {
            const nameElement = screen.getByText(data.name);
            expect(nameElement).toBeInTheDocument();
            const imageElement = screen.getByAltText(data.name);
            expect(imageElement).toBeInTheDocument();
            expect(imageElement).toHaveAttribute('src', data.image);
        });
    });
});
