import { ReactNode } from "react";
import { FormValidationState } from ".";

export interface AuthPageWrapperProps {
  title: ReactNode; // The title of the page, e.g., "Login" or "Register"
  linkText: ReactNode; // The text for the link, e.g., "Don't have an account?"
  linkPath: string; // The path the link goes to, e.g., "/register"
  children: ReactNode; // The form or other content to be rendered
  navigatorClassName?: string;
}

export interface AuthFormProps {
  title: string;
  linkPath: string;
  linkText: string;
  isLoading: boolean;
  isRegisterPage?: boolean;
  extraChildren?: ReactNode;
  navigatorClassName?: string;
  initialValues: { [key: string]: string };
  validationSchema: { [key: string]: string };
  onSubmit: ({ values, isValid }: FormValidationState) => void;
}
