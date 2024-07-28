import SideBar from '../../components/SideBar/SideBar.tsx';
import React, { ReactElement } from 'react';
import MainLayout from '../../components/layouts/MainLayout/MainLayout.tsx';
import DetailsLayout from '../../components/layouts/DetailsLayout/DetailsLayout.tsx';
import { useRouter } from 'next/router';

function DetailsPage() {
    const router = useRouter();
    const handleMainClick = () => {
        router.back();
    };
    return (
        <React.Fragment>
            <h1>Details</h1>
            <SideBar></SideBar>
            <button onClick={handleMainClick}>Close</button>
        </React.Fragment>
    );
}

DetailsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            <DetailsLayout>{page}</DetailsLayout>
        </MainLayout>
    );
};

export default DetailsPage;
