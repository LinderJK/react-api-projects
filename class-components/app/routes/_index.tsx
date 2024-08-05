import { redirect } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
    return redirect(`/character`);
};
