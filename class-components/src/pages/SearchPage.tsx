import useLocalStorage from '../hooks/useLocalStorage.ts';
import { useApiRequest } from '../hooks/useApiRequest.ts';
import TitleBar from '../components/TitleBar/TitleBar.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import ResultBar from '../components/ResultBar/ResultBar.tsx';

function SearchPage() {
    const { query, setQuery } = useLocalStorage();
    const { data, loading, error } = useApiRequest(query);

    const handleSearch = (query: string) => {
        setQuery(query);
    };

    return (
        <>
            <div className={'header'}>
                <TitleBar />
                <SearchBar onSearch={handleSearch} query={query} />
            </div>
            <ResultBar results={data} error={error} isLoading={loading}></ResultBar>
        </>
    );
}

export default SearchPage;
