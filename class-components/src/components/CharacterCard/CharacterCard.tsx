import { Component } from 'react';
import { Character } from '../../types/Character.ts';
import styles from './CharacterCard.module.css';
interface CharacterCardProps {
    result: Character;
}
class CharacterCard extends Component<CharacterCardProps> {
    render() {
        const { name, gender, image, status, type } = this.props.result;
        return (
            <div className={styles.card}>
                <div className={styles.cardTitle}>{name}</div>
                <div className={styles.avatar}>
                    <img className={styles.image} src={image} alt={name}></img>
                </div>
                <div>{gender}</div>
                <div>{status}</div>
                <div>{type}</div>
            </div>
        );
    }
}

export default CharacterCard;
