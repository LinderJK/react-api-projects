import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import React, { ChangeEvent, useCallback } from 'react';
import { favoriteSlice } from '../../store/reducers/FavoriteSlice.ts';
import { useNavigate } from '@remix-run/react';
import { useLocation } from '@remix-run/react';

interface CharacterCardProps {
    character: Character;
    children?: React.ReactNode;
}

export default function CharacterCard({ character, children }: CharacterCardProps) {
    const { name, image, status, id } = character;

    const navigate = useNavigate();
    const location = useLocation();

    const { selectCharacter, unselectCharacter } = favoriteSlice.actions;
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.favorite);

    const isDetails = (() => {
        return location.pathname.includes('/details/');
    })();

    const handleClick = () => {
        navigate(`/character/details/${id}${location.search}`);
    };

    const isSelectedCharacter = useCallback(
        (id: number) => {
            return selected.some((selectedCharacter) => selectedCharacter.id === id);
        },
        [selected],
    );

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(selectCharacter(character));
        } else {
            dispatch(unselectCharacter(character));
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
            <input
                className={styles.selectItem}
                type={'checkbox'}
                onChange={handleCheck}
                checked={isSelectedCharacter(id)}
            />
            {children}
        </div>
    );
}
