import { redirect } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

export default function App() {
    return null;
}

export const loader: LoaderFunction = async () => {
    return redirect(`/character`);
};
