import TitleBar from '../TitleBar/TitleBar.tsx';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.tsx';
export default function Header() {
    return (
        <div className="header">
            <TitleBar />
            <ThemeToggle></ThemeToggle>
            <SearchBar />
        </div>
    );
}
