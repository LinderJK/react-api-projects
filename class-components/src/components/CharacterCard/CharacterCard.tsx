import { Component } from 'react';
import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
interface CharacterCardProps {
    result: Character;
}
class CharacterCard extends Component<CharacterCardProps> {
    render() {
        const { name, gender, image, status, type, species } = this.props.result;
        return (
            <div
                className={`${styles.card} ${status === 'Dead' ? styles.dead : ''} ${status === 'Alive' ? styles.alive : ''}`}
            >
                <div className={styles.cardTitle}>{name}</div>
                <div className={styles.avatar}>
                    <img className={styles.image} src={image} alt={name}></img>
                </div>
                <div>Gender - {gender || '...'}</div>
                <div>Status - {status || '...'}</div>
                <div>Species - {species || '...'}</div>
                <div>Type - {type || '...'}</div>
            </div>
        );
    }
}

export default CharacterCard;
