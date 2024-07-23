import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import styles from './SelectBar.module.css';
import { unselectAllCharacter } from '../../store/reducers/FavoriteSlice.ts';
import { downloadCSV } from '../../utils/generateCSV.ts';

const SelectBar = () => {
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.favorite);

    const handleReset = () => {
        dispatch(unselectAllCharacter());
    };

    return (
        <>
            {selected.length > 0 && (
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.info}>{`Selected ${selected.length} items`}</div>
                        <div className={styles.control}>
                            <button onClick={handleReset}>Unselect all</button>
                            <a href={downloadCSV(selected)} download={`rick_and_morty_${selected.length}.csv`}>
                                <button>Download</button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SelectBar;
