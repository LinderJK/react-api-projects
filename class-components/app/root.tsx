import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function Root() {
    return (
        <html lang="en">
            <head>
                <Links />
                <Meta />
            </head>
            <body>
                <ErrorBoundary fallback={<h1>Oh no, an error occurred!</h1>}>
                    <Provider store={store}>
                        <ThemeProvider>
                            <Outlet />
                        </ThemeProvider>
                    </Provider>
                </ErrorBoundary>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
