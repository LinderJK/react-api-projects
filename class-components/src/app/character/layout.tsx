import styles from './styles.module.css';
import { ReactNode } from 'react';

export default function TestPageLayout({ children, mainSlot }: { children: ReactNode; mainSlot: ReactNode }) {
    return (
        <div className={styles.container}>
            <section className={styles.characterSection}>{mainSlot}</section>
            <section className={styles.detailsSection}>{children}</section>
        </div>
    );
}
