import TitleBar from '../../TitleBar/TitleBar.tsx';
import ThemeToggle from '../../ThemeToggle/ThemeToggle.tsx';
import styles from './layout.module.css';
import { useTheme } from '../../../hooks/useTheme.ts';
import SearchBar from '../../SearchBar/SearchBar.tsx';

export default function MainLayout({ children }: { children: JSX.Element }) {
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
