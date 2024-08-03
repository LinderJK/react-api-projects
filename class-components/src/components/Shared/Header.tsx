import React from 'react';
import TitleBar from '../TitleBar/TitleBar.tsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.tsx';
import SearchBar from '../SearchBar/SearchBar.tsx';

const Header = () => {
    return (
        <div className="header">
            <TitleBar />
            <ThemeToggle></ThemeToggle>
            <SearchBar />
        </div>
    );
};

export default Header;
