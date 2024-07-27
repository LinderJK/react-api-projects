import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage.tsx';
import { fireEvent, screen } from '@testing-library/react';

describe('NotFoundPage Component test', () => {
    test('renders the NotFoundPage component', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/404']}>
                <Routes>
                    <Route path="/404" element={<NotFoundPage />}></Route>
                    <Route path="/" element={<MainPage></MainPage>}></Route>
                </Routes>
                {/*<NotFoundPage />*/}
            </MemoryRouter>,
        );
        const title = screen.getByText(`Page Not Found`);
        expect(title).toBeInTheDocument();
        const button = screen.getByText(`To main`);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(title).not.toBeInTheDocument();
    });
});
