import Pagination from '../../components/Pagination/Pagination.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';
import SelectBar from '../../components/SelectBar/SelectBar.tsx';
import React, { ReactElement } from 'react';
import MainLayout from '../../components/layouts/MainLayout/MainLayout.tsx';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '../../store/store.ts';
import { characterAPI } from '../../services/CharacterService.ts';

function CharacterPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data } = props.pageProps;

    return (
        <React.Fragment>
            <Pagination maxPages={data.info.pages}></Pagination>
            <ResultBar results={data.results}></ResultBar>
            <SelectBar></SelectBar>
        </React.Fragment>
    );
}

CharacterPage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default CharacterPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const page = (context.query.page as string) ?? '1';
    const name = (context.query.name as string) ?? '';

    if (typeof name === 'string') {
        // console.log('DISPATCH');
        store.dispatch(characterAPI.endpoints.getCharactersByPage.initiate({ name, page }));
    }

    await Promise.all(store.dispatch(characterAPI.util.getRunningQueriesThunk()));

    const state = store.getState();

    const queryKey = `getCharactersByPage({"name":"${name}","page":"${page}"})`;
    const data = state.characterAPI.queries[queryKey]?.data;

    return {
        props: {
            data: data,
        },
    };
});
