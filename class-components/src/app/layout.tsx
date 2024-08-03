import { Metadata } from 'next';
import './globals.css';
import StoreProvider from './StoreProvider.tsx';
import Header from '../components/Shared/Header.tsx';
import { ThemeProvider } from '../context/ThemeProvider.tsx';

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
                        <main className="main">{children}</main>
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
