import { describe, test } from 'vitest';
import SideBar from '../components/SideBar/SideBar';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// const data = {
//     id: 1,
//     name: 'Character 1',
//     status: 'Dead',
//     species: 'Human',
//     type: 'Type 1',
//     gender: 'Male',
//     origin: {
//         name: 'Origin 1',
//         url: 'https://example.com/origin-1',
//     },
//     image: 'https://example.com/image-1',
//     episode: ['https://example.com/episode-1', 'https://example.com/episode-2'],
//     url: 'https://example.com/character-1',
//     created: 1234567890,
//     description: 'Description 1',
// };

describe('SideBar Component', () => {
    test('renders the SideBar component', () => {
        render(
            <MemoryRouter>
                <SideBar></SideBar>
            </MemoryRouter>,
        );
    });
});
