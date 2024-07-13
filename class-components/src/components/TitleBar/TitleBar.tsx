import RickLogo from '/portal.svg';
import styles from './TitleBar.module.css';
import { useNavigate } from 'react-router-dom';

export default function TitleBar() {
    const navigate = useNavigate();
    return (
        <div className={styles.titleBar} onClick={() => navigate('/')}>
            <img className={styles.logoPortal} src={RickLogo} alt="portal" />
            <h1>Rick & Morty Character Finder</h1>
        </div>
    );
}
