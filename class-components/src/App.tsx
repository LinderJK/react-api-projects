import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import Details from './components/Details/Details.tsx';

export default function App() {
    return (
        <div className={'app'}>
            <Routes>
                <Route path="/" element={<Details />}>
                    <Route index element={<MainPage />}></Route>
                    <Route path="*" element={<NotFoundPage />}></Route>
                </Route>
            </Routes>
        </div>
    );
}
