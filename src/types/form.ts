import { ReactNode } from "react";

export interface FormState {
  isValid: boolean;
  values: { [key: string]: any };
  errors: { [key: string]: string };
  validateInput: (name: string) => void;
  setFieldError: (name: string, message: string) => void;
  handleChange: (name: string, value: any, rules?: string) => void;
}

export interface FormValidationState {
  isValid: boolean;
  values: { [key: string]: any };
}

export interface FormProps {
  ref?: string;
  className?: string;
  children: (formProps: FormState) => ReactNode;
  initialValues: { [key: string]: any };
  validationSchema?: Record<string, string>;
  onSubmit: ({ isValid, values }: FormValidationState) => void;
}

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  type?: string;
  label: string;
  error?: string;
  labelClass?: string;
  inputClass?: string;
  autoFocus?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  value?: string | number;
  confirmPassword?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidate?: ({
    isValid,
    message,
  }: {
    isValid: boolean;
    message?: string;
  }) => void;
}
