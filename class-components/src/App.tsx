import { Component } from 'react';
import './App.css';
import ResultBar from './components/ResultBar/ResultBar.tsx';
import axios, { isAxiosError } from 'axios';
import { Character } from './types/Character.ts';
import TitleBar from './components/TitleBar/TitleBar.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';

interface AppState {
    results: Character[];
    searchQuery: string;
    error: string | null;
}

class App extends Component {
    state: AppState = {
        results: [],
        searchQuery: '',
        error: null,
    };
    async componentDidMount() {
        const queryByLs = localStorage.getItem('searchQuery') || '';
        console.log(queryByLs, 'Search QUERY');
        this.setState({ searchQuery: queryByLs }, async () => {
            await this.fetchResults(this.state.searchQuery);
        });
    }

    private async fetchResults(searchQuery: string) {
        this.setState({ error: null });
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
            const data = response.data.results;
            this.setState({ results: data });
        } catch (error: unknown) {
            if (error) {
                if (isAxiosError(error)) {
                    this.setState({ error: error.response?.data.error });
                }
            } else {
                console.error(error);
            }
        }
    }

    handleSearch = async (query: string) => {
        await this.fetchResults(query);
        localStorage.setItem('searchQuery', query);
    };

    render() {
        return (
            <div className={'app'}>
                <div className={'header'}>
                    <TitleBar />
                    <SearchBar onSearch={this.handleSearch} query={this.state.searchQuery} />
                </div>
                <ResultBar results={this.state.results}></ResultBar>
            </div>
        );
    }
}

export default App;
