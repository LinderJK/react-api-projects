import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import Header from '../src/components/Shared/Header';
import SelectBar from '../src/components/SelectBar/SelectBar';
import './styles/global.css';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
    return (
        <html>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <Scripts />
                <ScrollRestoration />
            </body>
        </html>
    );
}
export default function App() {
    return (
        <Layout>
            <Provider store={store}>
                <ThemeProvider>
                    <Header></Header>
                    <main className="main">
                        <Outlet />
                    </main>
                    <SelectBar></SelectBar>
                </ThemeProvider>
            </Provider>
        </Layout>
    );
}

export function ErrorBoundary() {
    return (
        <Layout>
            <h1>OH snap! Its TEST ERROR BOUNDARY</h1>
            <button onClick={() => window.location.reload()}>Go to main?</button>
        </Layout>
    );
}

export function HydrateFallback() {
    return (
        <Layout>
            <h1>Loading...</h1>
        </Layout>
    );
}
