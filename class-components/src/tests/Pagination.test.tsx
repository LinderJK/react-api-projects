import { expect, test } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';

describe('Pagination', () => {
    beforeAll(() => {
        vi.mock('next/router', () => require('next-router-mock'));
    });
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });
    test('should render', async () => {
        renderWithProviders(<Pagination maxPages={20}></Pagination>, {});
        mockRouter.setCurrentUrl('/character?page=1');
        const btnPrev = screen.getByText('Previous');
        expect(btnPrev).toBeDisabled();
        const btnNext = screen.getByText('Next');
        expect(btnNext).toBeInTheDocument();
        expect(btnPrev).toBeDisabled();
        fireEvent.click(btnNext);
        await waitFor(() => {
            expect(mockRouter.asPath).toBe('/character?page=2');
        });
        expect(btnPrev).toBeEnabled();
        fireEvent.click(btnPrev);
        await waitFor(() => {
            expect(mockRouter.asPath).toBe('/character?page=1');
        });
    });
});
