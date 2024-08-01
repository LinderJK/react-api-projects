import styles from './styles.module.css';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import { useRouter } from 'next/router';
import { Character } from '../../types/Character.ts';

interface SideBarProps {
    dataDetails: Character;
}
export default function SideBar({ dataDetails }: SideBarProps) {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <div className={styles.detailsContainer}>Invalid character ID</div>;
    }

    return <div className={styles.detailsContainer}>{dataDetails && <CharacterCard character={dataDetails} />}</div>;
}
