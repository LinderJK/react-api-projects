import { test } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination', () => {
    test('should render', () => {
        const { store } = renderWithProviders(
            <MemoryRouter>
                <Pagination></Pagination>
            </MemoryRouter>,
            {
                preloadedState: {
                    search: {
                        searchQuery: '',
                        currentPage: 1,
                        maxPages: 10,
                    },
                },
            },
        );
        const pagination = screen.getByText(
            `${store.getState().search.currentPage} / ${store.getState().search.maxPages}`,
        );
        expect(pagination).toBeInTheDocument();
        const btnPrev = screen.getByText('Previous');
        expect(btnPrev).toBeDisabled();
        const btnNext = screen.getByText('Next');
        expect(btnNext).toBeInTheDocument();
    });
});
