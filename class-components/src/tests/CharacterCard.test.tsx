import { describe, expect, test } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
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
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });
    test('Preloaded state to render', () => {
        renderWithProviders(<CharacterCard character={data} />, {
            preloadedState: {
                favorite: {
                    selected: [data],
                    isLoading: false,
                    error: '',
                },
            },
        });
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    test('Renders the CharacterCard component with title and image', () => {
        renderWithProviders(<CharacterCard character={data} />);
        const nameElement = screen.getByText(data.name);
        expect(nameElement).toBeInTheDocument();
        const imageElement = screen.getByAltText(data.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', data.image);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    test('Checks the checkbox', async () => {
        renderWithProviders(<CharacterCard character={data} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        await waitFor(() => {
            expect(checkbox).toBeChecked();
        });
    });

    test('Unchecks the checkbox', async () => {
        renderWithProviders(<CharacterCard character={data} />);
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
