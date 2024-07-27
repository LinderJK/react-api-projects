import { describe, expect, test } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';

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

describe('CharacterCard Component test', () => {
    test('Preloaded state to render', () => {
        renderWithProviders(
            <MemoryRouter>
                <CharacterCard character={data} />
            </MemoryRouter>,
            {
                preloadedState: {
                    favorite: {
                        selected: [data],
                        isLoading: false,
                        error: '',
                    },
                },
            },
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

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
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    test('navigates to DetailsPage', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path={`/`} element={<CharacterCard character={data} />} />
                    <Route path={`/details/${data.id}`} element={<DetailsPage />} />
                </Routes>
            </MemoryRouter>,
        );

        const imageElement = screen.getByAltText(data.name);
        fireEvent.click(imageElement);

        await waitFor(() => {
            const detailsHeading = screen.getByRole('heading', { name: 'Details' });
            expect(detailsHeading).toBeInTheDocument();
        });
    });
    test('checks the checkbox', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <CharacterCard character={data} />
            </MemoryRouter>,
        );
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        await waitFor(() => {
            expect(checkbox).toBeChecked();
        });
    });

    test('unchecks the checkbox', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <CharacterCard character={data} />
            </MemoryRouter>,
        );
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        await waitFor(() => {
            expect(checkbox).toBeChecked();
        });
        fireEvent.click(checkbox);
        await waitFor(() => {
            expect(checkbox).not.toBeChecked();
        });
    });
});
