import { expect, test } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';
import { screen } from '@testing-library/react';

vi.mock('@remix-run/react', () => {
    return {
        useNavigate: () => vi.fn(),
        useLocation: () => ({
            pathname: '',
            search: '',
        }),
    };
});
describe('Pagination', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });
    test('should render', async () => {
        renderWithProviders(<Pagination maxPages={5} currentPage={1} />, {});
        const btnPrev = screen.getByText('Previous');
        expect(btnPrev).toBeDisabled();
        const btnNext = screen.getByText('Next');
        expect(btnNext).toBeInTheDocument();
        expect(btnPrev).toBeDisabled();
    });
});
