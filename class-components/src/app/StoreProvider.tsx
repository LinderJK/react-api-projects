'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../store/store.ts';
import { AppStore } from '../tests/testStore/setupStore.ts';

export default function StoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
