import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

export default function App() {
    return (
        <div className={'app'}>
            <Routes>
                <Route path="/" element={<Navigate to={`/search`} />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </div>
    );
}
