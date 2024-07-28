import TitleBar from '../components/TitleBar/TitleBar.tsx';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.tsx';
import styles from '../styles/layout.module.css';
import { useTheme } from '../hooks/useTheme.ts';
import SearchBar from '../components/SearchBar/SearchBar.tsx';

export default function Layout({ children }: { children: JSX.Element }) {
    const { theme } = useTheme();
    return (
        <>
            <div data-theme={theme} className={styles.app}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <TitleBar />
                        <ThemeToggle></ThemeToggle>
                        <SearchBar />
                    </div>
                    <div className={styles.main}>{children}</div>
                </div>
            </div>
        </>
    );
}
