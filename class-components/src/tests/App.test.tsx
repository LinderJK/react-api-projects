import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import { ThemeProvider } from '../context/ThemeContext.tsx';
import { fireEvent, screen } from '@testing-library/react';

describe('App test', () => {
    test('Renders the App component', () => {
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        );
    });

    test('Toggle theme', () => {
        renderWithProviders(
            <MemoryRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </MemoryRouter>,
        );

        const button = screen.getByText(/Switch to Light/i);
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(button).toHaveTextContent(/Switch to Dark/i);

        fireEvent.click(button);
        expect(button).toHaveTextContent(/Switch to Light/i);
    });
    test('Checks the error'),
        () => {
            renderWithProviders(
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>,
            );

            const error = screen.getByText('Error!');
            const search = screen.getByPlaceholderText('Input Character Name');
            expect(search).toBeInTheDocument();
            expect(error).toBeInTheDocument();

            fireEvent.click(error);
            const errorMsg = screen.getByText('Oops! Render Error :(');
            expect(errorMsg).toBeInTheDocument();
            const buttonClose = screen.getByText('Retry');
            fireEvent.click(buttonClose);
            expect(errorMsg).not.toBeInTheDocument();
            expect(search).toBeInTheDocument();
        };
});
