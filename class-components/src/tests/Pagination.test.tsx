import { expect, test } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';
import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

vi.mock('next/navigation', () => {
    return {
        __esModule: true,
        usePathname: () => ({
            pathname: '',
            includes: () => {
                return false;
            },
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
describe('Pagination', () => {
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
    });
});
