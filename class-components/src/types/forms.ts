import { UseFormRegister } from 'react-hook-form';
import { InputProps } from './input.ts';

export interface IFormData {
    [key: string]: string | number | boolean | File | undefined;
}

export type InputPropsWithRegister = InputProps & {
    error?: string;
    register?: UseFormRegister<IFormData>;
};
