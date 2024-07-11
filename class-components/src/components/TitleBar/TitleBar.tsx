import RickLogo from '/portal.svg';
import styles from './TitleBar.module.css';

export default function TitleBar() {
    return (
        <div className={styles.titleBar}>
            <img className={styles.logoPortal} src={RickLogo} alt="portal" />
            <h1>Rick & Morty Character Finder</h1>
        </div>
    );
}

// class TitleBar extends Component {
//     render() {
//         return (
//             <div className={styles.titleBar}>
//                 <img className={styles.logoPortal} src={RickLogo} alt="portal" />
//                 <h1>Rick & Morty Character Finder</h1>
//             </div>
//         );
//     }
// }
// export default TitleBar;
