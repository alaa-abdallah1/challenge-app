export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  btnType?: ButtonType;
  isDisabled?: boolean;
}

export type ButtonType =
  | "info"
  | "white"
  | "danger"
  | "primary"
  | "default"
  | "success";

export type ButtonSize = "small" | "medium" | "large";
