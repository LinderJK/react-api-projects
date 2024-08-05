import styles from '../../styles.module.css';

export default function DetailsPageLayout({
    children,
    mainSlot,
}: {
    children: React.ReactNode;
    mainSlot: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <section className={styles.characterSection}>{mainSlot}</section>
            <section className={styles.detailsSection}>{children}</section>
        </div>
    );
}
