import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { screen } from '@testing-library/react';
import Custom404 from '../pages/404.tsx';

describe('NotFoundPage Component test', () => {
    test('Renders the NotFoundPage component', () => {
        renderWithProviders(<Custom404 />);
        const title = screen.getByText(`Oh....404 - Page Not Found`);
        expect(title).toBeInTheDocument();
        const button = screen.getByText('Go Back');
        expect(button).toBeInTheDocument();
    });
});
