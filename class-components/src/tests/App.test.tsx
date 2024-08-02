import { describe, test } from 'vitest';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { render } from '@testing-library/react';
import MyApp from '../pages/_app.tsx';
import Home from '../pages';
import { router } from 'next/client';

describe('App test', () => {
    test('Renders the App component', () => {
        render(<Home />);
    });

    test('Toggle theme', () => {
        const Component = () => <div>Test Component</div>;
        const pageProps = {};

        renderWithProviders(<MyApp Component={Component} pageProps={pageProps} router={router} />);
    });
});
