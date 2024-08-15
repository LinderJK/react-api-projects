import styles from './style.module.css';
import Input from '../../components/Input.tsx';
import InputProps from '../../types/input.ts';
import { boolean, number, object, ref, string } from 'yup';
import { FormEvent } from 'react';

const inputs: InputProps[] = [
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Name', value: '' },
    { name: 'age', type: 'number', label: 'Age', placeholder: 'Age', value: '' },
    { name: 'email', type: 'email', label: 'Email', placeholder: 'Email', value: '' },
    { name: 'password', type: 'password', label: 'Password', placeholder: 'Password', value: '' },
    { name: 'confirmPassword', type: 'password', label: '', placeholder: 'Confirm Password', value: '' },
    { name: 'gender', type: 'text', label: 'Gender', placeholder: 'Gender', value: '' },
    { name: 'country', type: 'text', label: 'Country', placeholder: 'Country', value: '' },
    { name: 'image', type: 'file', label: 'Image', placeholder: 'Image' },
    { name: 'agree', type: 'checkbox', label: 'Agree', placeholder: 'Agree' },
];

const userSchema = object({
    name: string()
        .required('Name is required')
        .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: number()
        .required('Age is required')
        .positive('Age must be a positive number')
        .integer('Age must be a integer number'),
    email: string().required().email('Email is required'),
    password: string()
        .required()
        .matches(/^[A-Z]/, 'Password must start with an uppercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[!@#$%^&*]/, 'Password must contain a special character'),
    confirmPassword: string()
        .required()
        .oneOf([ref('password')], 'Passwords must match'),
    gender: string().required().oneOf(['male', 'female'], 'Gender is required'),
    country: string().required(),
    image: string(),
    agree: boolean().required().oneOf([true], 'You must agree to the terms and conditions'),
});

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userSchema
        .validate(event.currentTarget.form, { abortEarly: false })
        .then((values) => {
            console.log(values);
        })
        .catch((error) => {
            console.log(error);
        });

    // event.currentTarget.form.reset();
};

export default function UncontrolledForm() {
    return (
        <div>
            <h1>Uncontrolled Forms</h1>
            <div>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {inputs.map((input) => (
                            <Input key={input.name} {...input} />
                        ))}
                        <button type="submit">Submit form</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
