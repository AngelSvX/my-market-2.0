import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary:
      "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-700",
    outline:
      "border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-400",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? "w-full" : "px-5"}
        py-2.5 text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;