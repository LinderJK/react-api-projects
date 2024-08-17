import { boolean, number, object, ref, string } from 'yup';
import * as Yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['image/jpeg', 'image/png'];

export const userSchema = object({
    name: string()
        .required('Name is required')
        .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: number()
        .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
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
    gender: string().required().oneOf(['Female', 'Male'], 'Gender is required'),
    country: string().required(),
    image: Yup.mixed()
        .required()
        .test('image must be added', 'Image is required', (value) => {
            if (value instanceof File) {
                return value.size > 0;
            }
            return true;
        })
        .test('fileSize', 'File too large. Max file size is 2MB', (value) => {
            if (value instanceof File) {
                return value.size <= MAX_FILE_SIZE;
            }
            return true;
        })
        .test('fileType', 'Invalid file type', (value) => {
            if (value instanceof File) {
                return ALLOWED_EXTENSIONS.includes(value.type);
            }
            return true;
        }),
    agree: boolean().required().oneOf([true], 'You must agree to the terms and conditions'),
});
