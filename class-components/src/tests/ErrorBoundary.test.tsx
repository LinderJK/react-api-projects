import { renderWithProviders } from './testStore/renderWithProviders.tsx';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx';
import { screen } from '@testing-library/react';

const ProblematicComponent = () => {
    throw new Error('Test error');
    return <div>Should not render</div>;
};

const FallbackComponent = ({ error }: { error?: Error }) => (
    <div>
        <p>Something went wrong!</p>
        {error && <p>{error.message}</p>}
    </div>
);

const consoleError = console.error;

beforeEach(() => {
    console.error = vi.fn();
});

afterEach(() => {
    console.error = consoleError;
});

describe('ErrorBoundary Component', () => {
    test('renders children when no error occurs', () => {
        renderWithProviders(
            <ErrorBoundary fallback={<FallbackComponent />}>
                <div>Content</div>
            </ErrorBoundary>,
        );

        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('renders fallback UI when error occurs', () => {
        renderWithProviders(
            <ErrorBoundary fallback={<FallbackComponent />}>
                <ProblematicComponent />
            </ErrorBoundary>,
        );
        expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
        expect(screen.getByText('Test error')).toBeInTheDocument();
    });
});
