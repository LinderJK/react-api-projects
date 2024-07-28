import { Component, ReactNode } from 'react';

interface IErrorBoundaryProps {
    fallback: ReactNode;
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<IErrorBoundaryProps> {
    state: IErrorBoundaryState = { hasError: false, error: null };
    static getDerivedStateFromError(error: Error): IErrorBoundaryState {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    {this.props.fallback}
                    {this.state.error && <p>{this.state.error.message}</p>}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
