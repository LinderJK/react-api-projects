import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { ChangeEvent, useCallback } from 'react';
import { favoriteSlice } from '../../store/reducers/FavoriteSlice.ts';
import { useRouter } from 'next/router';
import Link from 'next/link';
interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard(props: CharacterCardProps) {
    const { name, gender, image, status, type, species, id } = props.character;
    const router = useRouter();
    const { page, name: queryName } = router.query;
    // console.log(router, 'ROUTER CHARACTER CARD');
    const { selectCharacter, unselectCharacter } = favoriteSlice.actions;
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.favorite);

    const isDetails = (() => {
        return router.pathname.includes('/details/');
    })();

    const isSelectedCharacter = useCallback(
        (id: number) => {
            return selected.some((selectedCharacter) => selectedCharacter.id === id);
        },
        [selected],
    );

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
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
            <Link
                href={{
                    pathname: `/character/details/${id}`,
                    query: { page, queryName },
                }}
                as={`/character/details/${id}?page=${page}&name=${name}`}
            >
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
