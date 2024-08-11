import { describe, expect } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SelectBar from '../components/SelectBar/SelectBar.tsx';
import { downloadCSV } from '../utils/generateCSV.ts';
import CharacterPage from '../../app/routes/character.tsx';

vi.mock('@remix-run/react', () => {
    return {
        useNavigate: () => vi.fn(),
        useLocation: () => ({
            pathname: '',
            search: '',
        }),
        useLoaderData: () => ({
            currentPage: 1,
            data: {
                info: {
                    pages: 1,
                },
                results: [
                    { id: 1, name: 'Rick', status: 'Alive', image: 'url1' },
                    { id: 2, name: 'Morty', status: 'Alive', image: 'url2' },
                ],
            },
            error: null,
        }),
        useNavigation: () => {
            return {
                state: 'idle',
            };
        },
        Outlet: () => <div>Mocked Outlet</div>,
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

vi.mock('../utils/generateCSV.ts', () => ({
    downloadCSV: vi.fn(),
}));
describe('SelectBar Component test', () => {
    test('Renders the CharacterPage and checks the checkbox', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['/character']}>
                <CharacterPage></CharacterPage>
            </MemoryRouter>,
            {
                preloadedState: {
                    favorite: {
                        selected: [],
                        isLoading: false,
                        error: '',
                    },
                },
            },
        );

        await waitFor(() => {
            const checkboxes = screen.getAllByRole('checkbox');
            expect(checkboxes.length).toBeGreaterThan(0);
            expect(checkboxes[0]).toBeInTheDocument();
        });
        const firstCheckbox = screen.getAllByRole('checkbox')[1];
        fireEvent.click(firstCheckbox);
        expect(firstCheckbox).toBeChecked();

        const state = store.getState();
        expect(state.favorite.selected.length).toBeGreaterThan(0);
    });

    test('Renders the SelectBar component', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <SelectBar></SelectBar>
            </MemoryRouter>,
            {
                preloadedState: {
                    favorite: {
                        selected: [data.results[0]],
                        isLoading: false,
                        error: '',
                    },
                },
            },
        );
        const downloadButton = screen.getByText('Download');
        expect(downloadButton).toBeInTheDocument();
        const unselectButton = screen.getByText('Unselect all');
        expect(unselectButton).toBeInTheDocument();
        await waitFor(() => {
            fireEvent.click(downloadButton);
            expect(downloadCSV).toHaveBeenCalled();
        });
    });
});
