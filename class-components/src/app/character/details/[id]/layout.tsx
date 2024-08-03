import CharacterPage from '../../page.tsx';
import styles from './styles.module.css';

export default function DetailsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <section className={styles.characterSection}>
                <CharacterPage></CharacterPage>
            </section>
            <section className={styles.detailsSection}>{children}</section>
        </div>
    );
}
