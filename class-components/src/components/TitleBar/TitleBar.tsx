import PortalLogo from '../../assets/portal.svg';
import styles from './TitleBar.module.css';
import Image from 'next/image';

export default function TitleBar() {
    return (
        <div className={styles.titleBar}>
            <Image className={styles.logoPortal} src={PortalLogo} alt="portal" />
            <h1>Rick & Morty Character Finder</h1>
        </div>
    );
}
