import { IFormData } from '../../types/forms.ts';
import styles from './style.module.css';

export default function DataCard(props: IFormData & { isLastItem: boolean }) {
    return (
        <div
            className={
                styles.cardContainer +
                ' ' +
                (props.isLastItem ? styles.lastCard : '')
            }
        >
            {Object.entries(props).map((item) => {
                const [key, value] = item;
                if (key === 'image') {
                    return (
                        <>
                            <img
                                width={200}
                                height={200}
                                src={value as string}
                                alt={key}
                                key={key}
                                className={styles.image}
                            ></img>
                        </>
                    );
                }
                if (key === 'isLastItem') return null;
                if (key === 'agree') {
                    return (
                        <div className={styles.card} key={key}>
                            <span className={styles.cardTitle}>{key}</span>
                            <span className={styles.cardValue}>
                                {value ? 'Yes' : 'No'}
                            </span>
                        </div>
                    );
                }
                return (
                    <div className={styles.card} key={key}>
                        <span className={styles.cardTitle}>{key}</span>
                        <span className={styles.cardValue}>
                            {value as string}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
