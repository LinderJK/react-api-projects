import { describe, expect, test } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import MainLayout from '../components/layouts/MainLayout/MainLayout.tsx';

const TestingComponent = () => {
    return <>Text For Test Children</>;
};

describe('MainLayout test', () => {
    test('Renders the Layout', async () => {
        renderWithProviders(
            <MainLayout>
                <TestingComponent />
            </MainLayout>,
        );

        await waitFor(() => {
            expect(screen.getByText('Text For Test Children')).toBeInTheDocument();
        });
    });
    test('Have title', async () => {
        renderWithProviders(
            <MainLayout>
                <TestingComponent />
            </MainLayout>,
        );
        await waitFor(() => {
            expect(screen.getByText('Rick & Morty Character Finder')).toBeInTheDocument();
        });
    });
    test('Have search bar', async () => {
        renderWithProviders(
            <MainLayout>
                <TestingComponent />
            </MainLayout>,
        );
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Input Character Name')).toBeInTheDocument();
        });
    });
    test('Have button theme', async () => {
        renderWithProviders(
            <MainLayout>
                <TestingComponent />
            </MainLayout>,
        );
        await waitFor(() => {
            const button = screen.getByText('Switch to Light');
            expect(button).toBeInTheDocument();
            fireEvent.click(button);
            expect(screen.getByText('Switch to Dark')).toBeInTheDocument();
        });
    });
});
