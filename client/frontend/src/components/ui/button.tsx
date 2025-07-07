import type { ReactElement } from "react";

type Variants = "primary" | "secondary" | "ghost";
interface ButtonProps {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: () => void;
  endIcon?: ReactElement;
  startIcon?: ReactElement;
  className?:string;
}
const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-400",
  ghost: "bg-transparent text-gray-700 hover:text-blue-600",
};
const sizeStyles = {
  sm: "px-3 py-2 text-sm  rounded-sm",
  md: "px-4 py-2 text-md rounded-md",
  lg: "px-6 py-3 text-lg rounded-lg",
};
const defaultSyles = "rounded-md px-4 py-2 font-light ";
export const Button = ({
  variant = "primary",
  size = "md",
  text,
  onClick,
  endIcon,
  startIcon,
  className="",
  ...props
}: ButtonProps) => {
  const ghostHover =
    variant === "ghost"
      ? "hover:bg-gray-100 transition-colors duration-100"
      : "";
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${variantStyles[variant]} ${defaultSyles} ${sizeStyles[size]} ${ghostHover} flex items-center ${className} `}
    >
      {startIcon && <span>{startIcon}</span>}
      <span>{text}</span>
      {endIcon}
    </button>
  );
};

{
  /* <Button
        variant="primary"
        size="lg"
        startIcon={<PlusIcon size="lg" />}
        text="Click me"
        onClick={() => alert("Button clicked!")}
      /> */
}
