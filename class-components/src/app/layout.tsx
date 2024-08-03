import { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext.tsx';
import StoreProvider from './StoreProvider.tsx';
import Header from '../components/Shared/Header.tsx';

export const metadata: Metadata = {
    title: 'Rick and Morty Characters',
    icons: {
        shortcut: '/rick.svg',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <ThemeProvider>
                        <Header></Header>
                        {children}
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
