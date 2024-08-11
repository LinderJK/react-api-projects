export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: number;
}

export interface CharacterResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[];
}
