import '../styles/globals.css';
import '../styles/theme.css';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext.tsx';
import { wrapper } from '../store/store.ts';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, ...rest }: AppPropsWithLayout) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <ErrorBoundary fallback={fallBackComponent()}>
            <Provider store={store}>
                <ThemeProvider>{getLayout(<Component {...props} />)}</ThemeProvider>
            </Provider>
        </ErrorBoundary>
    );
}

const fallBackComponent = () => {
    return (
        <>
            <h1>Oh no an error occurred!</h1>
            <p>This error from ErrorBoundary</p>
            <p>Please reload the page =)</p>
        </>
    );
};
