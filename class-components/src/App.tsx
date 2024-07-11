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

// class App extends Component {
//     state: AppState = {
//         results: [],
//         searchQuery: '',
//         error: null,
//         isLoading: false,
//     };
//     async componentDidMount() {
//         const queryByLs = localStorage.getItem('searchQuery') || '';
//         this.setState({ searchQuery: queryByLs }, async () => {
//             await this.fetchResults(this.state.searchQuery);
//         });
//     }
//
//     private async fetchResults(searchQuery: string) {
//         this.setState({ error: null });
//         this.setState({ isLoading: true });
//         try {
//             const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
//             const data = response.data.results;
//             this.setState({ results: data });
//         } catch (error: unknown) {
//             if (error) {
//                 if (isAxiosError(error)) {
//                     this.setState({ error: error.response?.data.error });
//                 }
//             } else {
//                 console.error(error);
//             }
//         } finally {
//             this.setState({ isLoading: false });
//         }
//     }
//
//     handleSearch = async (query: string) => {
//         await this.fetchResults(query);
//         localStorage.setItem('searchQuery', query);
//     };
//
//     render() {
//         return (
//             <div className={'app'}>
//                 <ErrorBoundary fallback={<h1>Oh no an error occurred!</h1>}>
//                     <div className={'header'}>
//                         <TitleBar />
//                         <SearchBar onSearch={this.handleSearch} query={this.state.searchQuery} />
//                     </div>
//                     <ResultBar
//                         results={this.state.results}
//                         error={this.state.error}
//                         isLoading={this.state.isLoading}
//                     ></ResultBar>
//                 </ErrorBoundary>
//             </div>
//         );
//     }
// }
//
// export default App;
