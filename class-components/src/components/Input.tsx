import styles from './styles.module.css';
import InputProps, { CheckboxInputProps, SelectInputProps, TextInputProps } from '../types/input.ts';

export default function Input(props: InputProps & { error?: string }) {
    const { name, label, disabled = false, type, autocomplete = 'off', placeholder, error } = props;

    const inputProps = {
        name,
        disabled,
        placeholder,
        autoComplete: autocomplete,
        id: name,
        className: styles.myInput,
        type: type,
    };

    return (
        <div className={styles.container}>
            <label className={styles.myLabel} htmlFor={name}>
                {label}
            </label>
            {inputProps.type === 'select' ? (
                <select {...inputProps}>
                    {(props as SelectInputProps).options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...inputProps}
                    {...(type === 'checkbox' ? { defaultChecked: (props as CheckboxInputProps).checked } : false)}
                    {...(type !== 'file'
                        ? { defaultValue: (props as TextInputProps).value }
                        : {
                              value: undefined,
                              accept: 'image/*',
                          })}
                />
            )}

            <span className={styles.myError}>{error}</span>
        </div>
    );
}
