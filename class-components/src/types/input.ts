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

export type SelectInputProps = BaseInputProps & {
    type: 'select';
    value: string;
    options: string[];
};

export type AutoCompleteInputProps = BaseInputProps & {
    type: 'autocomplete';
    value: string;
    options: string[];
};

export type FileInputProps = BaseInputProps & {
    type: 'file';
    value?: undefined;
    accept?: string;
};

type InputProps = TextInputProps | CheckboxInputProps | FileInputProps | SelectInputProps | AutoCompleteInputProps;

export default InputProps;
