import SideBar from '../../../components/SideBar/SideBar.tsx';
import React, { ReactElement } from 'react';
import MainLayout from '../../../components/layouts/MainLayout/MainLayout.tsx';
// import DetailsLayout from '../../../components/layouts/DetailsLayout/DetailsLayout.tsx';
import { useRouter } from 'next/router';
import styles from '../../../components/layouts/DetailsLayout/layout.module.css';
// import CharacterPage from '../index.tsx';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '../../../store/store.ts';
import { characterAPI } from '../../../services/CharacterService.ts';
import Pagination from '../../../components/Pagination/Pagination.tsx';
import ResultBar from '../../../components/ResultBar/ResultBar.tsx';
import SelectBar from '../../../components/SelectBar/SelectBar.tsx';

function DetailsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { dataMain, dataDetails } = props.pageProps;
    // console.log(dataMain, 'MY DATA MAIN');
    // console.log(dataDetails, 'MY DATA DETAILS');
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
        // <React.Fragment>
        //     <h1>Details</h1>
        //     <SideBar></SideBar>
        //     <button onClick={handleMainClick}>Close</button>
        // </React.Fragment>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    // console.log(context, 'CONTEXT DETAILS PAGE');
    const page = (context.query.page as string) ?? '1';
    const name = (context.query.name as string) ?? '';
    const id = (context.query.id as string) ?? '';
    // const dispatch = useAppDispatch();
    // console.log('getServerSideProps - page:', page, 'name:', name);
    if (typeof name === 'string') {
        // console.log('DISPATCH');
        store.dispatch(characterAPI.endpoints?.getCharacterById.initiate(id));
        store.dispatch(characterAPI.endpoints?.getCharactersByPage.initiate({ name, page }));
    }

    await Promise.all(store.dispatch(characterAPI.util.getRunningQueriesThunk()));

    // console.log('SERVER STATE', store.getState().character);
    const state = store.getState();
    // console.log('STATE AFTER THUNKS:', state);

    const queryKeyMain = `getCharactersByPage({"name":"${name}","page":"${page}"})`;
    const queryKeyDetails = `getCharacterById("${id}")`;
    const dataMain = state.characterAPI.queries[queryKeyMain]?.data;
    const dataDetails = state.characterAPI.queries[queryKeyDetails]?.data;

    // console.log('DATA FROM STATE:', data);
    // console.log(state, 'STATE');
    // const data = state.character;
    // const initialData = state.characterAPI.queries['getCharactersByPage']['data'];

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
