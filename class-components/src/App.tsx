import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.tsx';

export default function App() {
    return (
        <div className={'app'}>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route path="/details/:id" element={<DetailsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </div>
    );
}
