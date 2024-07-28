import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SearchBar Component test', () => {
    test('Renders the SearchBar component', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>,
        );

        expect(screen.getByPlaceholderText('Input Character Name')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });

    test('handles input change', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>,
        );

        const inputElement = screen.getByPlaceholderText('Input Character Name');
        fireEvent.change(inputElement, { target: { value: 'Rick' } });

        expect(inputElement).toHaveValue('Rick');
    });
});
