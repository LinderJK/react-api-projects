import styles from './styles.module.css';
import InputProps, { CheckboxInputProps, TextInputProps } from '../types/input.ts';

export default function Input(props: InputProps) {
    const { name, label, disabled = false, type, autocomplete = 'off', placeholder } = props;

    const inputProps = {
        name,
        disabled,
        placeholder,
        autoComplete: autocomplete,
        id: name,
        className: styles.myInput,
    };

    return (
        <div className={styles.container}>
            <label className={styles.myLabel} htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                {...inputProps}
                {...(type === 'checkbox' ? { defaultChecked: (props as CheckboxInputProps).checked } : {})}
                {...(type !== 'file'
                    ? { defaultValue: (props as TextInputProps).value }
                    : {
                          value: undefined,
                          accept: 'image/*',
                      })}
            />
        </div>
    );
}
