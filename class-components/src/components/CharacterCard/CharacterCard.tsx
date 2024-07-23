import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { useCallback } from 'react';
import { favoriteSlice } from '../../store/reducers/FavoriteSlice.ts';
interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard(props: CharacterCardProps) {
    const { name, gender, image, status, type, species, id } = props.character;

    const navigate = useNavigate();
    const location = useLocation();

    const { selectCharacter, unselectCharacter } = favoriteSlice.actions;
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.favorite);

    const isDetails = (() => {
        return location.pathname.startsWith('/details/');
    })();

    const handleClick = () => {
        navigate(`/details/${id}${location.search}`);
    };

    const isSelectedCharacter = useCallback(
        (id: number) => {
            return selected.some((selectedCharacter) => selectedCharacter.id === id);
        },
        [selected],
    );

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(selectCharacter(props.character));
        } else {
            dispatch(unselectCharacter(props.character));
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
            <input type={'checkbox'} onChange={handleCheck} checked={isSelectedCharacter(id)} />
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
