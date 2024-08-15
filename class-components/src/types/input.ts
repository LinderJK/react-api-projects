export type BaseInputProps = {
    name: string;
    label: string;
    placeholder: string;
    autocomplete?: 'off' | 'on';
    disabled?: boolean;
};

export type TextInputProps = BaseInputProps & {
    type: 'text' | 'number' | 'password' | 'email';
    value: string;
};

export type CheckboxInputProps = BaseInputProps & {
    type: 'checkbox';
    checked?: boolean;
};

export type FileInputProps = BaseInputProps & {
    type: 'file';
    value?: undefined;
    accept?: string;
};

type InputProps = TextInputProps | CheckboxInputProps | FileInputProps;

export default InputProps;
