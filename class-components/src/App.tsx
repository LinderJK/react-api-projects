import './App.css';
import ResultBar from './components/ResultBar/ResultBar.tsx';
import TitleBar from './components/TitleBar/TitleBar.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { useApiRequest } from './hooks/useApiRequest.ts';
import useLocalStorage from './hooks/useLocalStorage.ts';

export default function App() {
    const { query, setQuery } = useLocalStorage();
    const { data, loading, error } = useApiRequest(query);

    const handleSearch = (query: string) => {
        setQuery(query);
    };

    return (
        <div className={'app'}>
            <ErrorBoundary fallback={<h1>Oh no an error occurred!</h1>}>
                <div className={'header'}>
                    <TitleBar />
                    <SearchBar onSearch={handleSearch} query={query} />
                </div>
                <ResultBar results={data} error={error} isLoading={loading}></ResultBar>
            </ErrorBoundary>
        </div>
    );
}
