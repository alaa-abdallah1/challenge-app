import React from "react";
import { AxiosError } from "axios";
import { useAuth, useGlobalNotification } from "@/contexts";
import { useMutation } from "@/hooks";
import { AuthForm } from "@/components";
import { FormValidationState } from "@/types";

const initialValues = {
  email: "", // Default email for testing michael.lawson@reqres.in
  password: "",
};

const validationSchema = {
  email: "required|email",
  password: "required|password",
};

const Login: React.FC = () => {
  const { handleSuccessfulLogin } = useAuth();
  const { showMessage } = useGlobalNotification();
  const { mutate: login, isLoading } = useMutation();

  const handleLogin = async ({ values, isValid }: FormValidationState) => {
    if (!isValid) return;

    try {
      const { data } = await login({
        url: "/login",
        method: "POST",
        data: values,
      });

      handleSuccessfulLogin(data?.token);
      showMessage({ message: "Login successful" });
    } catch (error: AxiosError | any) {
      showMessage({
        message:
          error.response?.data?.error ||
          "An error occurred during login. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <AuthForm
      title="Login"
      linkPath="/register"
      isLoading={isLoading}
      initialValues={initialValues}
      linkText="Don't have an account?"
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    />
  );
};

export default Login;
