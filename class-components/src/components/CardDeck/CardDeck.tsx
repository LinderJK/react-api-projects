import { useAppSelector } from '../../hooks/redux.ts';
import DataCard from '../DataCard/DataCard.tsx';
import styles from './styles.module.css';

export default function CardDeck() {
    const data = useAppSelector((state) => state.forms);
    const isLastItem = (index: number) => index === data.length - 1;
    return (
        <div className={styles.cardDeck}>
            {!!data && data.length > 0 ? (
                data.map((item, index) => {
                    const lastItem = isLastItem(index);
                    return (
                        <DataCard
                            {...item}
                            key={item.email as string}
                            isLastItem={lastItem}
                        />
                    );
                })
            ) : (
                <p>No submitted form yet</p>
            )}
        </div>
    );
}
