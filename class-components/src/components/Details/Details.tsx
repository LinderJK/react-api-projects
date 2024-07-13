import { Outlet } from 'react-router-dom';
import styles from './Details.module.css';

function Details() {
    return (
        <>
            <SideBar></SideBar>
            <Outlet></Outlet>
        </>
    );
}

export default Details;

function SideBar() {
    return (
        <div className={styles.detailsContainer}>
            <h1>Hi iam sidebar</h1>
        </div>
    );
}
