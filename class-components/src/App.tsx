import './App.css';
import MainPage from './pages/mainPage.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import ControlledForm from './pages/controlledForm.tsx';
import UncontrolledForm from './pages/uncontrolledForm.tsx';
import NotFound from './pages/NotFoundPage.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/controlled" element={<ControlledForm />} />
            <Route path="/uncontrolled" element={<UncontrolledForm />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    );
}

export default App;
