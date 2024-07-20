import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import { useGetCharacterByIdQuery } from '../../services/CharacterService.ts';

export default function SideBar() {
    // const [data, setData] = useState<Character>();
    // const [error, setError] = useState<string | null>();
    // const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams();
    const { data, error, isLoading } = useGetCharacterByIdQuery(id || '', {
        skip: !id,
    });
    console.log(data, 'DATA FROM SIDE BAR');

    if (!id) {
        return <div className={styles.detailsContainer}>Invalid character ID</div>;
    }

    // useEffect(() => {
    //     const getSidebarData = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    //             if (response.data) {
    //                 setData(response.data);
    //             }
    //         } catch (error: unknown) {
    //             if (isAxiosError(error)) {
    //                 setError(error.response?.data.error || 'An error occurred');
    //             } else {
    //                 setError('An unexpected error occurred');
    //                 console.error(error);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     getSidebarData();
    // }, [id]);

    return (
        <div className={styles.detailsContainer}>
            {error && <div>{error.toString()}</div>}
            {isLoading && <div>Loading...</div>}
            {data && <CharacterCard character={data} />}
        </div>
    );
}
