import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
    test('renders the App component', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        );
    });
});
