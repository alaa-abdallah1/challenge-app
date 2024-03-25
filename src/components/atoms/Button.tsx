import { ButtonProps, ButtonType } from "@/types";
import React from "react";
import { Icon } from "./Icon";

const buttonStyles: Record<ButtonType, string> = {
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  info: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
  success: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
  primary: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  default:
    "bg-theme text-theme hover:dark:bg-gray-600 hover:bg-gray-200 focus:dark:ring-gray-200 focus:ring-gray-200 border border-gray-300",
  white:
    "bg-white dark:bg-gray-700 border text-theme hover:dark:bg-gray-600 hover:bg-gray-50 focus:dark:ring-gray-200 focus:ring-gray-200",
};

const sizeStyles: Record<string, string> = {
  small: "py-1 px-2 text-xs",
  medium: "py-2 px-3 text-sm",
  large: "py-3 px-4 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  isDisabled,
  fullWidth = false,
  btnType = "default",
  size = "medium", // Default size
  ...props
}) => {
  // Merge additional className props with the buttonStyles based on btnType
  const combinedClassName = [
    "flex justify-center border border-transparent rounded-md shadow-sm items-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
    buttonStyles[btnType],
    (isLoading || isDisabled) && "cursor-not-allowed opacity-60",
    fullWidth ? "w-full" : "max-w-max",
    sizeStyles[size],
    className, // Allow for additional custom classes to be applied
  ]
    .filter(Boolean) // Remove any undefined or empty strings
    .join(" "); // Join all the classes into a single string

  return (
    <>
      <button
        className={combinedClassName}
        disabled={isLoading || isDisabled}
        {...props}
      >
        {isLoading ? (
          <Icon
            name="spinner"
            viewBox="0 0 32.707 32.707"
            className="animate-spin h-5 w-5 fill-theme-dark dark:fill-theme"
          />
        ) : (
          children
        )}
      </button>
    </>
  );
};
