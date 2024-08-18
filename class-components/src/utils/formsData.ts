import { InputProps } from '../types/input.ts';

export const inputs: InputProps[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Name',
        value: '',
    },
    {
        name: 'age',
        type: 'number',
        label: 'Age',
        placeholder: 'Age',
        value: '',
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        value: '',
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        value: '',
    },
    {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        value: '',
    },
    {
        name: 'gender',
        type: 'select',
        label: 'Gender',
        placeholder: 'Gender',
        value: '',
        options: ['Female', 'Male'],
    },
    {
        name: 'country',
        type: 'autocomplete',
        label: 'Country',
        placeholder: 'Country',
        value: '',
        options: [],
    },
    { name: 'image', type: 'file', label: 'Image', placeholder: 'Image' },
    {
        name: 'agree',
        type: 'checkbox',
        label: 'Terms and Conditions agreement',
        placeholder: 'Agree',
    },
];
