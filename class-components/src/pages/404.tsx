import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();
    return (
        <div>
            <h1>Oh....404 - Page Not Found</h1>
            <button onClick={router.back}>Go Back</button>
        </div>
    );
}
