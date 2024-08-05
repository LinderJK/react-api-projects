'use client';
import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import React, { ChangeEvent, useCallback } from 'react';
import { favoriteSlice } from '../../store/reducers/FavoriteSlice.ts';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CharacterCardProps {
    character: Character;
    children?: React.ReactNode;
}

export default function CharacterCard({ character, children }: CharacterCardProps) {
    const { name, image, status, id } = character;
    const { selectCharacter, unselectCharacter } = favoriteSlice.actions;
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.favorite);

    const isSelectedCharacter = useCallback(
        (id: number) => {
            return selected.some((selectedCharacter: Character) => selectedCharacter.id === id);
        },
        [selected],
    );

    const searchParams = useSearchParams();
    const query = searchParams.get('name') ?? '';
    const page = searchParams.get('page') ?? '1';

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(selectCharacter(character));
        } else {
            dispatch(unselectCharacter(character));
        }
    };

    return (
        <div
            className={`${styles.card} ${status === 'Dead' ? styles.dead : ''} ${status === 'Alive' ? styles.alive : ''}`}
        >
            <div className={styles.cardTitle}>{name}</div>
            <Link href={`/character/details/${id}?name=${query}&page=${page}`}>
                <div className={styles.avatar}>
                    <img className={styles.image} src={image} alt={name}></img>
                </div>
            </Link>
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
