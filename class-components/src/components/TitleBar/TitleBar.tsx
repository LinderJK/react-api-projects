import { Component } from 'react';
import RickLogo from '../../../public/portal.svg';
import styles from './TitleBar.module.css';

class TitleBar extends Component {
    render() {
        return (
            <div className={styles.titleBar}>
                <img className={styles.logoPortal} src={RickLogo} alt="portal" />
                <h1>Rick & Morty Character Finder</h1>
            </div>
        );
    }
}
export default TitleBar;
