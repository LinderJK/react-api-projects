import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    query: string;
    onSearch: (query: string) => void;
}

class SearchBar extends React.Component<SearchBarProps> {
    state = {
        query: this.props.query,
    };

    componentDidUpdate(prevProps: SearchBarProps) {
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

    render() {
        return (
            <div className={styles.searchBar}>
                <input
                    className={styles.input}
                    type="text"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}
export default SearchBar;
