import { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from './setupStore';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState = {} as Partial<RootState>,
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) {
    const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => (
        <Provider store={store}>{children}</Provider>
    );

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
