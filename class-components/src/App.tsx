import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.tsx';
import './App.css';
import { useTheme } from './hooks/useTheme.ts';

export default function App() {
    const { theme } = useTheme();
    return (
        <div data-theme={theme} className={`app`}>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route path="/details/:id" element={<DetailsPage />} />
                </Route>
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </div>
    );
}
