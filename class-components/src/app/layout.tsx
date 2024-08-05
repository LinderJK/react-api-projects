import { Metadata } from 'next';
import './globals.css';
import StoreProvider from './StoreProvider.tsx';
import Header from '../components/Shared/Header.tsx';
import { ThemeProvider } from '../context/ThemeProvider.tsx';
import { ReactNode } from 'react';
import SelectBar from '../components/SelectBar/SelectBar.tsx';

export const metadata: Metadata = {
    title: 'Rick and Morty Characters',
    icons: {
        shortcut: '/rick.svg',
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <ThemeProvider>
                        <Header></Header>
                        <main className="main">{children}</main>
                        <SelectBar></SelectBar>
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
