import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { characterSlice } from '../../store/reducers/CharacterSlice.ts';
import { useAppDispatch } from '../../hooks/redux.ts';
interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard(props: CharacterCardProps) {
    const { name, gender, image, status, type, species, id } = props.character;
    const navigate = useNavigate();
    const location = useLocation();
    const { addCharacter, deleteCharacter } = characterSlice.actions;
    const dispatch = useAppDispatch();

    const isDetails = (() => {
        return location.pathname.startsWith('/details/');
    })();

    const handleClick = () => {
        navigate(`/details/${id}${location.search}`);
    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(addCharacter(props.character));
        } else {
            dispatch(deleteCharacter(props.character));
        }
    };

    return (
        <div
            className={`${styles.card} ${status === 'Dead' ? styles.dead : ''} ${status === 'Alive' ? styles.alive : ''} ${isDetails ? '' : styles.cardActive}`}
        >
            <div className={styles.cardTitle}>{name}</div>
            <div onClick={handleClick} className={styles.avatar}>
                <img className={styles.image} src={image} alt={name}></img>
            </div>
            <input type={'checkbox'} onChange={handleCheck} />
            {isDetails && (
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
