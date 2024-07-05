import React from 'react';
import styles from './SearchBar.module.css';

interface ISearchBarProps {
    query: string;
    onSearch: (query: string) => void;
}

interface ISearchBarState {
    query: string;
    error: boolean;
}

class SearchBar extends React.Component<ISearchBarProps> {
    state: ISearchBarState = {
        query: this.props.query,
        error: false,
    };

    componentDidUpdate(prevProps: ISearchBarProps) {
        if (prevProps.query !== this.props.query) {
            this.setState({ query: this.props.query });
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value.trim() });
    };

    handleSearch = () => {
        this.props.onSearch(this.state.query);
    };

    handleError = () => {
        this.setState({ error: true });
    };

    render() {
        if (this.state.error) {
            throw new Error('This Error generate in SearchBar component for testing ErrorBoundary');
        }
        return (
            <div className={styles.searchBar}>
                <input
                    className={styles.input}
                    type="text"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearch}>Search</button>
                <button onClick={this.handleError}>Error!</button>
            </div>
        );
    }
}
export default SearchBar;
