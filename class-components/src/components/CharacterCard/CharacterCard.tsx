import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard(props: CharacterCardProps) {
    const { name, gender, image, status, type, species, id } = props.character;
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(`/details/${id}${location.search}`);
    };
    return (
        <div
            onClick={handleClick}
            className={`${styles.card} ${status === 'Dead' ? styles.dead : ''} ${status === 'Alive' ? styles.alive : ''}`}
        >
            <div className={styles.cardTitle}>{name}</div>
            <div className={styles.avatar}>
                <img className={styles.image} src={image} alt={name}></img>
            </div>
            {location.pathname.startsWith('/details/') && (
                <>
                    <div>Gender - {gender || '...'}</div>
                    <div>Status - {status || '...'}</div>
                    <div>Species - {species || '...'}</div>
                    <div>Type - {type || '...'}</div>
                </>
            )}
        </div>
    );
}
