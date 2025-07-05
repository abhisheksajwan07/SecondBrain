import type { ReactElement } from "react";

type Variants = "primary" | "secondary";
interface ButtonProps {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: () => void;
  endIcon?: ReactElement;
  startIcon?: ReactElement;
}
const variantStyles = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};
const sizeStyles = {
  sm: "px-3 py-2 text-sm  rounded-sm", 
  md: "px-4 py-2 text-md rounded-md", 
  lg: "px-6 py-3 text-lg rounded-lg", 
};
const defaultSyles = "rounded-md p-4";
export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultSyles} ${
        sizeStyles[props.size] 
      } flex items-center gap-2`}
    >
      {props.startIcon && <span >{props.startIcon}</span>}
      <span>{props.text}</span>
      {props.endIcon}
    </button>
  );
};
