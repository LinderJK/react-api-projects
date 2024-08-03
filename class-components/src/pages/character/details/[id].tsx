import SideBar from '../../../components/SideBar/SideBar.tsx';
import React, { ReactElement } from 'react';
import MainLayout from '../../../components/layouts/MainLayout/MainLayout.tsx';
import { useRouter } from 'next/router';
import styles from '../../../components/layouts/DetailsLayout/layout.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '../../../store/store.ts';
import { characterAPI } from '../../../services/CharacterService.ts';
import Pagination from '../../../components/Pagination/Pagination.tsx';
import ResultBar from '../../../components/ResultBar/ResultBar.tsx';
import SelectBar from '../../../components/SelectBar/SelectBar.tsx';

function DetailsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { dataMain, dataDetails } = props.pageProps;
    const handleMainClick = () => {
        router.back();
    };
    return (
        <div className={styles.container}>
            <div className={styles.main} onClick={handleMainClick}>
                <React.Fragment>
                    <Pagination maxPages={dataMain.info.pages}></Pagination>
                    <ResultBar results={dataMain.results}></ResultBar>
                    <SelectBar></SelectBar>
                </React.Fragment>
            </div>
            <div className={styles.sidebar}>
                <React.Fragment>
                    <h1>Details</h1>
                    <SideBar dataDetails={dataDetails}></SideBar>
                    <button onClick={handleMainClick}>Close</button>
                </React.Fragment>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const page = (context.query.page as string) ?? '1';
    const name = (context.query.name as string) ?? '';
    const id = (context.query.id as string) ?? '';

    if (typeof name === 'string') {
        // console.log('DISPATCH');
        store.dispatch(characterAPI.endpoints?.getCharacterById.initiate(id));
        store.dispatch(characterAPI.endpoints?.getCharactersByPage.initiate({ name, page }));
    }

    await Promise.all(store.dispatch(characterAPI.util.getRunningQueriesThunk()));

    const state = store.getState();

    const queryKeyMain = `getCharactersByPage({"name":"${name}","page":"${page}"})`;
    const queryKeyDetails = `getCharacterById("${id}")`;
    const dataMain = state.characterAPI.queries[queryKeyMain]?.data;
    const dataDetails = state.characterAPI.queries[queryKeyDetails]?.data;

    return {
        props: {
            dataMain: dataMain,
            dataDetails: dataDetails,
        },
    };
});

DetailsPage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default DetailsPage;
