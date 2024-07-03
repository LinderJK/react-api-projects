import { Component } from 'react';
import './App.css';
import ResultBar from './components/ResultBar/ResultBar.tsx';

class App extends Component {
    state = {
        results: [],
    };
    async componentDidMount() {
        const searchQuery = localStorage.getItem('searchQuery') || '';
        await this.fetchResults(searchQuery);
    }

    private async fetchResults(searchQuery: string) {
        try {
            const data = await fetch(`https://rickandmortyapi.com/api/character/${searchQuery}`);
            this.setState({ results: data });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h1>Hello finder</h1>
                <ResultBar results={this.state.results}></ResultBar>
            </div>
        );
    }
}

export default App;
