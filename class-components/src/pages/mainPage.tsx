import { Link } from 'react-router-dom';
import CardDeck from '../components/CardDeck/CardDeck.tsx';

export default function MainPage() {
    return (
        <div>
            <h1>Forms</h1>
            <div>
                <Link to={`controlled`}>
                    <button>React Hook Form</button>{' '}
                </Link>
                <Link to={`uncontrolled`}>
                    <button>Uncontrolled Forms</button>
                </Link>
            </div>
            <CardDeck />
        </div>
    );
}
