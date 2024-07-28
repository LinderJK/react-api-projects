import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <p>Page Not Found</p>
            <Link to={'/'}>
                <button>To main</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
