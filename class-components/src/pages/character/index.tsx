import Pagination from '../../components/Pagination/Pagination.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';
import SelectBar from '../../components/SelectBar/SelectBar.tsx';
import React, { ReactElement } from 'react';
import MainLayout from '../../components/layouts/MainLayout/MainLayout.tsx';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '../../store/store.ts';
import { characterAPI } from '../../services/CharacterService.ts';
// import { Character } from '../../types/Character.ts';
// import { useAppDispatch } from '../../hooks/redux.ts';

function CharacterPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // console.log(props, 'page properties loaded successfully from getServerSideProps');

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
    // const dispatch = useAppDispatch();
    // console.log('getServerSideProps - page:', page, 'name:', name);
    if (typeof name === 'string') {
        // console.log('DISPATCH');
        store.dispatch(characterAPI.endpoints.getCharactersByPage.initiate({ name, page }));
    }

    await Promise.all(store.dispatch(characterAPI.util.getRunningQueriesThunk()));

    // console.log('SERVER STATE', store.getState().character);
    const state = store.getState();
    // console.log('STATE AFTER THUNKS:', state);

    const queryKey = `getCharactersByPage({"name":"${name}","page":"${page}"})`;
    const data = state.characterAPI.queries[queryKey]?.data;

    // console.log('DATA FROM STATE:', data);
    // console.log(state, 'STATE');
    // const data = state.character;
    // const initialData = state.characterAPI.queries['getCharactersByPage']['data'];

    return {
        props: {
            data: data,
        },
    };
});

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // const { page } = context.params || { page: '1' };
//     const { name, page } = context.query;
//     const currentPage = parseInt(page as string, 10) || 1;
//
//     const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${name ?? ''}`);
//     const data: CharacterResponse = await res.json();
//     // console.log(data);
//
//     return {
//         props: {
//             characters: data.results,
//             currentPage,
//             totalPages: data.info.pages,
//         },
//     };
// };
