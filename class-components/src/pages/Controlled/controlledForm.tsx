import styles from './style.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { inputs } from '../../utils/formsData.ts';
import Input from '../../components/CustomInput/Input.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { IFormData } from '../../types/forms.ts';
import { userSchema } from '../../utils/yupValidScheme.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertToBase64 } from '../../utils/convertToBase64.ts';
import { setFormData } from '../../features/formsSlice.ts';
import { useNavigate } from 'react-router-dom';

export default function ControlledForm() {
    const country = useAppSelector((state) => state.country.country);
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(userSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        try {
            const imageFileList = data['image'] as FileList | undefined;
            if (imageFileList && imageFileList.length > 0) {
                const base64Image = await convertToBase64(imageFileList[0]);
                data['image'] = base64Image as string;
            } else {
                data['image'] = '';
            }
            dispatch(setFormData(data));
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h1>Controlled Forms</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {updatedInputs.map((input) => (
                        <Input
                            {...input}
                            key={input.name}
                            register={register}
                            error={
                                errors[input.name as keyof IFormData]?.message
                            }
                        />
                    ))}
                    <button type="submit">Submit form</button>
                </form>
            </div>
        </div>
    );
}
