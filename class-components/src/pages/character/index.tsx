import Pagination from '../../components/Pagination/Pagination.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';
import SelectBar from '../../components/SelectBar/SelectBar.tsx';
import React, { ReactElement } from 'react';
import MainLayout from '../../components/layouts/MainLayout/MainLayout.tsx';

function CharacterPage() {
    return (
        <React.Fragment>
            <Pagination></Pagination>
            <ResultBar></ResultBar>
            <SelectBar></SelectBar>
        </React.Fragment>
    );
}

CharacterPage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default CharacterPage;

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
