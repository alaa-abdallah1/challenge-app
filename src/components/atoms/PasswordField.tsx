import { InputFieldProps } from "@/types";
import React, { useState } from "react";
import InputField from "./InputField";
import { Icon } from "@/components";

export const PasswordField: React.FC<InputFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputField
      {...props}
      type={showPassword ? "text" : "password"}
      suffixIcon={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 top-1 flex items-center text-sm leading-5 dark:fill-theme fill-theme-dark"
        >
          {showPassword ? <Icon name="eyeSlash" /> : <Icon name="eye" />}
        </button>
      }
    />
  );
};

export default PasswordField;
