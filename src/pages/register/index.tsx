import React from "react";
import { AxiosError } from "axios";
import { useAuth, useGlobalNotification } from "@/contexts";
import { useMutation } from "@/hooks";
import { AuthForm } from "@/components";
import { FormValidationState } from "@/types";

const initialValues = {
  email: "", // Default email for testing
  password: "",
  confirmPassword: "",
};

const validationSchema = {
  email: "required|email",
  password: "required|password",
  confirmPassword: "required|password|confirm_password:password",
};

const Register: React.FC = () => {
  const { handleSuccessfulLogin } = useAuth();
  const { showMessage } = useGlobalNotification();
  const { mutate: register, isLoading } = useMutation();

  const handleRegister = async ({ values, isValid }: FormValidationState) => {
    if (!isValid) return;

    const { confirmPassword, ...userData } = values;

    try {
      const { data } = await register({
        url: "/register",
        method: "POST",
        data: userData,
      });

      handleSuccessfulLogin(data?.token);

      showMessage({ message: "Register successful" });
    } catch (error: AxiosError | any) {
      showMessage({
        message:
          error.response?.data?.error ||
          "An error occurred during registration. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <AuthForm
      isRegisterPage
      title="Register"
      linkPath="/login"
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={validationSchema}
      linkText="Already have an account?"
      onSubmit={handleRegister}
    />
  );
};

export default Register;
