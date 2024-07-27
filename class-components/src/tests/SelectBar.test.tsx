import { describe, expect } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import MainPage from '../pages/MainPage/MainPage.tsx';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { downloadCSV } from '../utils/generateCSV.ts';

vi.mock('../utils/generateCSV.ts');
describe('SelectBar test', () => {
    test('renders the SelectBar component', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <MainPage />
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
        const firstCheckbox = screen.getAllByRole('checkbox')[3];
        fireEvent.click(firstCheckbox);
        expect(firstCheckbox).toBeChecked();

        const state = store.getState();
        expect(state.favorite.selected.length).toBeGreaterThan(0);

        await waitFor(() => {
            const selectBar = screen.getByText('Download');
            expect(selectBar).toBeInTheDocument();
        });

        const downloadButton = screen.getByText('Download');
        fireEvent.click(downloadButton);
        expect(downloadCSV).toHaveBeenCalled();
    });

    test('renders the SelectBar component', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <MainPage></MainPage>
            </MemoryRouter>,
        );
        expect(store.getState().character.isLoading).toBe(true);
    });
});
