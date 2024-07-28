import '../styles/globals.css';
import '../styles/theme.css';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '../store/store.ts';
import Layout from './layout.tsx';
import { ThemeProvider } from '../context/ThemeContext.tsx';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}
