import styles from './style.module.css';
import Input from '../../components/Input.tsx';
import InputProps from '../../types/input.ts';

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

// const userSchema = object({
//     name: string().required(),
//     age: number().required().positive().integer(),
//     email: string().email(),
//     website: string().url().nullable(),
//     createdOn: date().default(() => new Date()),
// });

export default function UncontrolledForm() {
    return (
        <div>
            <h1>Uncontrolled Forms</h1>
            <div>
                <div className={styles.container}>
                    <form className={styles.form}>
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
