import { GetServerSideProps } from 'next';
import { Character, CharacterResponse } from '../../types/Character.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';
import ResultBar from '../../components/ResultBar/ResultBar.tsx';

type Props = {
    characters: Character[];
    currentPage: number;
    totalPages: number;
};

function CharacterPage({ characters, currentPage, totalPages }: Props) {
    return (
        <>
            <Pagination currentPage={currentPage} maxPages={totalPages}></Pagination>
            <ResultBar character={characters}></ResultBar>
        </>
    );
}

export default CharacterPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const { page } = context.params || { page: '1' };
    const { name, page } = context.query;
    const currentPage = parseInt(page as string, 10) || 1;

    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${name ?? ''}`);
    const data: CharacterResponse = await res.json();
    // console.log(data);

    return {
        props: {
            characters: data.results,
            currentPage,
            totalPages: data.info.pages,
        },
    };
};
