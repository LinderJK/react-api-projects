import styles from '../style.module.css';
import Input from '../../components/CustomInput/Input.tsx';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { userSchema } from '../../utils/yupValidScheme.ts';
import { ValidationError } from 'yup';
import { setFormData } from '../../features/formsSlice.ts';
import { convertToBase64 } from '../../utils/convertToBase64.ts';
import { useNavigate } from 'react-router-dom';
import { inputs } from '../../utils/formsData.ts';
import { IFormData } from '../../types/forms.ts';

export default function UncontrolledForm() {
    const country = useAppSelector((state) => state.country.country);
    const [errorsMessage, setErrorMessage] = useState<{
        [key: string]: string;
    } | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const updatedInputs = inputs.map((input) => {
        if (input.name === 'country') {
            return {
                ...input,
                options: country,
            };
        }
        return input;
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        updatedInputs.forEach((input) => {
            if (input.type === 'checkbox') {
                data[input.name] = String(formData.has(input.name));
            }
        });

        try {
            await userSchema.validate(data, { abortEarly: false });
            setErrorMessage(null);

            const imageFile = formData.get('image') as File;
            if (imageFile && imageFile.size > 0) {
                const base64Image = await convertToBase64(imageFile);
                data['image'] = base64Image as string;
            } else {
                data['image'] = '';
            }
            dispatch(setFormData(data as IFormData));
            navigate('/');
        } catch (err) {
            if (err instanceof ValidationError) {
                const errors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    errors[error.path!] = error.message;
                });
                setErrorMessage(errors);
            }
        }
    };

    return (
        <div>
            <h1>Uncontrolled Forms</h1>
            <div>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {updatedInputs.map((input) => (
                            <Input
                                {...input}
                                error={errorsMessage?.[input.name] ?? undefined}
                                key={input.name}
                            />
                        ))}
                        <button type="submit">Submit form</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
