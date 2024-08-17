import { IFormData } from '../../types/forms.ts';
import styles from './style.module.css';

export default function DataCard(props: IFormData & { isLastItem: boolean }) {
    return (
        <div className={styles.cardContainer + ' ' + (props.isLastItem ? styles.lastCard : '')}>
            {Object.entries(props).map((item) => {
                console.log(item);
                const [key, value] = item;
                if (key === 'image') {
                    return (
                        <>
                            <img
                                width={200}
                                height={200}
                                src={value}
                                alt={key}
                                key={key}
                                className={styles.image}
                            ></img>
                        </>
                    );
                }
                return (
                    <div className={styles.card} key={key}>
                        <span className={styles.cardTitle}>{key}</span>
                        <span className={styles.cardValue}>{value}</span>
                    </div>
                );
            })}
        </div>
    );
}
