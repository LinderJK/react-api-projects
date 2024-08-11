import { vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import { screen } from '@testing-library/react';
import { useNavigate } from '@remix-run/react';
import Header from '../components/Shared/Header.tsx';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';

vi.mock('@remix-run/react', () => ({
    useNavigate: vi.fn(),
}));

describe('SearchBar Component', () => {
    test('renders SearchBar with input and buttons', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>,
        );

        expect(screen.getByPlaceholderText('Input Character Name')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>,
        );

        const input = screen.getByPlaceholderText('Input Character Name');
        fireEvent.change(input, { target: { value: 'Rick' } });
        expect(input).toHaveValue('Rick');
    });

    test('navigates on search', () => {
        const navigate = vi.fn();

        vi.mocked(useNavigate).mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>,
        );

        const input = screen.getByPlaceholderText('Input Character Name');
        fireEvent.change(input, { target: { value: 'Rick' } });

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        expect(navigate).toHaveBeenCalledWith({
            pathname: '/character',
            search: '?name=Rick&page=1',
        });
    });

    test('throws error when error button is clicked', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>,
        );

        const errorButton = screen.getByText('Error!');
        expect(() => {
            fireEvent.click(errorButton);
        }).toThrow('Test error for ErorrBoundary');
    });

    test('render Header', () => {
        renderWithProviders(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );
        expect(screen.getByText('Rick & Morty Character Finder')).toBeInTheDocument();
    });
});
