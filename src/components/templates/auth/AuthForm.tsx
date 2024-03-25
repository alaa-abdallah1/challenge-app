import {
  Form,
  Button,
  InputField,
  PasswordField,
  AuthPageWrapper,
} from "@/components";
import React from "react";
import { AuthFormProps } from "@/types";

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  linkPath,
  linkText,
  onSubmit,
  isLoading,
  initialValues,
  extraChildren,
  validationSchema,
  isRegisterPage = false,
}) => {
  return (
    <AuthPageWrapper title={title} linkPath={linkPath} linkText={linkText}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, errors, isValid, handleChange, validateInput }) => (
          <>
            <InputField
              type="email"
              name="email"
              label="Email"
              placeholder="michael.lawson@reqres.in"
              error={errors["email"]}
              value={values["email"]}
              onBlur={() => validateInput("email")}
              onChange={({ target }) => handleChange("email", target.value)}
            />
            <PasswordField
              name="password"
              label="Password"
              value={values["password"]}
              error={errors["password"]}
              onBlur={() => validateInput("password")}
              onChange={({ target }) => handleChange("password", target.value)}
            />
            {isRegisterPage && (
              <>
                <PasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  value={values["confirmPassword"]}
                  error={errors["confirmPassword"]}
                  onBlur={() => validateInput("confirmPassword")}
                  onChange={({ target }) =>
                    handleChange("confirmPassword", target.value)
                  }
                />
                {extraChildren}
              </>
            )}

            <Button
              fullWidth
              type="submit"
              btnType="primary"
              className="font-mono"
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              {title}
            </Button>
          </>
        )}
      </Form>
    </AuthPageWrapper>
  );
};

export default AuthForm;
