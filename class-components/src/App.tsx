// import { Navigate, Route, Routes } from 'react-router-dom';
// import MainPage from './pagesOld/MainPage/MainPage.tsx';
// import NotFoundPage from './pagesOld/NotFoundPage.tsx';
// import DetailsPage from './pagesOld/DetailsPage/DetailsPage.tsx';
// import './styles/layout.module.css';
// import { useTheme } from './hooks/useTheme.ts';
//
// export default function App() {
//     const { theme } = useTheme();
//     return (
//         <div data-theme={theme} className={`app`}>
//             <Routes>
//                 <Route path="/" element={<MainPage />}>
//                     <Route path="/details/:id" element={<DetailsPage />} />
//                 </Route>
//                 <Route path="/404" element={<NotFoundPage />} />
//                 <Route path="*" element={<Navigate to="/404" replace />} />
//             </Routes>
//         </div>
//     );
// }
