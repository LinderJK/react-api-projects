import SideBar from '../../components/SideBar/SideBar.tsx';
import styles from './DetailsPage.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

function DetailsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const handleClick = () => {
        const name = searchParams.get('name');
        const page = searchParams.get('page');
        navigate(`/?name=${name}&page=${page}`);
    };

    return (
        <div className={styles.main}>
            <h1>Details</h1>
            <SideBar></SideBar>
            <button onClick={handleClick}>Close</button>
        </div>
    );
}

export default DetailsPage;
