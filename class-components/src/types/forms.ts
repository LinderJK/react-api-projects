export interface IFormData {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: ['male', 'female'];
    agree: boolean;
    image: File | string | null;
    country: string;
}
