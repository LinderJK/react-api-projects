import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import { Character } from '../../types/Character.ts';

export default function SideBar() {
    const [data, setData] = useState<Character>();
    const { id } = useParams();
    console.log(id, 'ID');

    useEffect(() => {
        const getSidebarData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                console.log(response, 'response');
                if (response.data) {
                    setData(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getSidebarData();
    }, [id]);

    return <div className={styles.detailsContainer}>{data && <CharacterCard character={data} />}</div>;
}
