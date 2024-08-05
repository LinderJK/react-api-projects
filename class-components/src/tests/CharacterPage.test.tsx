import { describe, expect } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { downloadCSV } from '../utils/generateCSV.ts';
import ResultBar from '../components/ResultBar/ResultBar.tsx';
import RootLayout from '../app/layout.tsx';

vi.mock('next/navigation', () => ({
    usePathname: vi.fn().mockReturnValue('/character/details/1'),
    useRouter: vi.fn().mockReturnValue({
        back: vi.fn(),
    }),
    useSearchParams: vi.fn(() => ({
        get: vi.fn().mockImplementation((param) => {
            if (param === 'name') return 'Rick';
            if (param === 'page') return '1';
            return null;
        }),
    })),
}));

vi.mock('../utils/generateCSV.ts');

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

describe('SelectBar Component test', () => {
    test('Renders the SelectBar component', async () => {
        renderWithProviders(
            <RootLayout>
                <ResultBar data={data} />
            </RootLayout>,
        );
        const pagination = screen.getByText(/Previous/i);
        expect(pagination).toBeInTheDocument();

        await waitFor(() => {
            const checkboxes = screen.getAllByRole('checkbox');
            expect(checkboxes.length).toBeGreaterThan(0);
            expect(checkboxes[0]).toBeInTheDocument();
        });
        const firstCheckbox = screen.getAllByRole('checkbox')[1];
        fireEvent.click(firstCheckbox);
        expect(firstCheckbox).toBeChecked();

        await waitFor(() => {
            const selectBar = screen.getByText('Download');
            expect(selectBar).toBeInTheDocument();
        });

        const downloadButton = screen.getByText('Download');
        fireEvent.click(downloadButton);
        expect(downloadCSV).toHaveBeenCalled();
    });

    test('Checks the error'),
        () => {
            renderWithProviders(
                <RootLayout>
                    <h1>Test children</h1>
                </RootLayout>,
            );

            const error = screen.getByText('Error!');
            const search = screen.getByPlaceholderText('Input Character Name');
            expect(search).toBeInTheDocument();
            expect(error).toBeInTheDocument();

            fireEvent.click(error);
            const errorMsg = screen.getByText('Oops! Render Error :(');
            expect(errorMsg).toBeInTheDocument();
            const buttonClose = screen.getByText('Retry');
            fireEvent.click(buttonClose);
            expect(errorMsg).not.toBeInTheDocument();
            expect(search).toBeInTheDocument();
        };
});
