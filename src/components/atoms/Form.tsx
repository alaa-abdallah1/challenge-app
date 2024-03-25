import { FormProps } from "@/types";
import {
  FormEvent,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

interface FormMethods {
  submitForm: (e?: FormEvent<HTMLFormElement>) => Promise<void>;
}

type FormRef = HTMLFormElement | FormMethods;

export const Form = forwardRef<FormRef, FormProps>(
  ({ children, onSubmit, className, initialValues, validationSchema }, ref) => {
    const [values, setValues] = useState<{ [key: string]: any }>({
      ...initialValues,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isValid, setIsValid] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
      submitForm: async (e) => {
        handleSubmit(e);
      },
    }));

    const validateInput = (
      name: string,
      value: string = values[name]
    ): boolean => {
      const rulesArray: string[] | undefined =
        validationSchema?.[name]?.split("|");

      if (!rulesArray) return true;

      let message: string = "";

      for (const rule of rulesArray) {
        if (rule === "required" && !value) {
          message = "This field is required";
          setErrors((prevErrors) => ({ ...prevErrors, [name]: message }));
          return false;
        } else if (
          rule === "password" &&
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
        ) {
          // This is a simple regex for password strength: At least one digit, one lowercase, one uppercase, and 8 characters long
          message = `Password does not meet complexity requirements (At least one digit, one lowercase, one uppercase, and 8 characters long)`;
        } else if (
          rule.startsWith("confirm_password:") &&
          values[rule.split(":")[1]] !== value
        ) {
          message = "Passwords don't match";
        } else if (
          rule.startsWith("min:") &&
          value.length < parseInt(rule.split(":")[1])
        ) {
          message = `Minimum value is ${rule.split(":")[1]} characters`;
        } else if (
          rule.startsWith("max:") &&
          value.length > parseInt(rule.split(":")[1])
        ) {
          message = `Maximum value is ${rule.split(":")[1]} characters`;
        } else if (
          rule.startsWith("maxLength:") &&
          value.length > parseInt(rule.split(":")[1])
        ) {
          message = `Maximum length is ${rule.split(":")[1]}`;
        } else if (rule === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
          message = "Invalid email format";
        } else if (rule === "url") {
          // This regex matches traditional URLs
          const urlRegex =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

          // This regex matches data URIs for images
          const dataUriRegex =
            /^data:image\/(jpeg|png|gif|bmp);base64,[\d+/A-Za-z]+={0,2}$/;

          if (!urlRegex.test(value) && !dataUriRegex.test(value)) {
            message = "Invalid URL format";
          }
        }
      }

      if (!value && !rulesArray.includes("required") && message) {
        message = "";
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: message }));

      return message === "";
    };

    const handleChange = (name: string, value: any) => {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
      validateInput(name, value);
    };

    const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      // check if all inputs are valid
      const validationResults = Object.keys(values).map((key) =>
        validateInput(key, values[key])
      );

      const isFormValid = !validationResults?.includes(false);

      setIsValid(isFormValid);

      if (isFormValid) {
        onSubmit({ values, isValid: isFormValid });
      }
    };

    useEffect(() => {
      const isFormValid = Object.values(errors).every((error) => error === "");
      setIsValid(isFormValid);
    }, [errors]);

    return (
      <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
        {typeof children === "function"
          ? children({
              values,
              errors,
              isValid,
              handleChange,
              validateInput,
              setFieldError: (name: string, message: string) =>
                setErrors({ ...errors, [name]: message }),
            })
          : children}
      </form>
    );
  }
);

export default Form;
