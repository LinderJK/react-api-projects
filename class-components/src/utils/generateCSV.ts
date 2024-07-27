import { Character } from '../types/Character.ts';

interface ICharacterForCSV {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    [key: string]: string;
}

export const generateCSV = (data: Array<Character>) => {
    const formatData: ICharacterForCSV[] = data.map((character) => {
        return {
            id: character.id.toString(),
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
            gender: character.gender,
            image: character.image,
        };
    });
    if (formatData.length === 0) return '';
    const headers = Object.keys(formatData[0]);

    const csvRows = [
        headers.join(','),
        ...formatData.map((row) => headers.map((header) => JSON.stringify(row[header], replacer)).join(',')),
    ];

    return csvRows.join('\n');
};

const replacer = (_: string, value: string) => value ?? '';

export const downloadCSV = (data: Array<Character>) => {
    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
};
