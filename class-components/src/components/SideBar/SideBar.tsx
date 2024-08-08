import styles from './styles.module.css';
import CharacterCard from '../CharacterCard/CharacterCard.tsx';
import { Character } from '../../types/Character.ts';
import { useLocation, useNavigate } from '@remix-run/react';

interface SideBarProps {
    dataDetails: Character;
}
export default function SideBar({ dataDetails }: SideBarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMainClick = () => {
        navigate(`/character/${location.search}`);
    };

    return (
        <div className={styles.details}>
            {dataDetails && (
                <CharacterCard character={dataDetails}>
                    <>
                        <div>Gender - {dataDetails.gender || '...'}</div>
                        <div>Status - {dataDetails.status || '...'}</div>
                        <div>Species - {dataDetails.species || '...'}</div>
                        <div>Type - {dataDetails.type || '...'}</div>
                    </>
                </CharacterCard>
            )}
            <button onClick={handleMainClick}>Close</button>
        </div>
    );
}
