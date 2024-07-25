import { useTheme } from '../../hooks/useTheme.ts';

const ThemeToggle = () => {
    const { toggleTheme, theme } = useTheme();

    return (
        <div>
            <button type="button" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
            </button>
        </div>
    );
};

export default ThemeToggle;
