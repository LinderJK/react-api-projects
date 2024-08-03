import React, { useEffect } from 'react';
import { Router } from 'next/router';

const UseLoader = () => {
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const eventStart = () => {
            setLoading(true);
        };
        const eventEnd = () => {
            setLoading(false);
        };
        Router.events.on('routeChangeStart', eventStart);
        Router.events.on('routeChangeComplete', eventEnd);
        Router.events.on('routeChangeError', eventEnd);
        return () => {
            Router.events.off('routeChangeStart', eventStart);
            Router.events.off('routeChangeComplete', eventEnd);
            Router.events.off('routeChangeError', eventEnd);
        };
    }, []);

    return { loading };
};

export default UseLoader;
