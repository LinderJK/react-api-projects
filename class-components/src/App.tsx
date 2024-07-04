import { Component } from 'react';
import './App.css';
import ResultBar from './components/ResultBar/ResultBar.tsx';
import axios from 'axios';
import { Character } from './types/Character.ts';
import TitleBar from './components/TitleBar/TitleBar.tsx';

interface AppState {
    results: Character[];
}

class App extends Component {
    state: AppState = {
        results: [],
    };
    async componentDidMount() {
        const searchQuery = localStorage.getItem('searchQuery') || '';
        await this.fetchResults(searchQuery);
    }

    private async fetchResults(searchQuery: string) {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${searchQuery}`);
            const data = response.data.results.slice(0, 10);
            console.log(data);
            this.setState({ results: data });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <TitleBar />
                <ResultBar results={this.state.results}></ResultBar>
            </div>
        );
    }
}

export default App;
