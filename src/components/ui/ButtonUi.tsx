"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "default";
  fullWidth?: boolean;
  className?: string;
  label?: string;
}

export const ButtonUi: React.FC<ButtonUiProps> = ({
  children,
  variant = "default",
  fullWidth = false,
  type = "button",
  className = "",
  label = "Подтвердить",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "secondary":
        return "bg-gray-200 dark:bg-transparent border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-200 dark:bg-transparent border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white";
    }
  };

  return (
    <button
      type="button"
      className={`
        px-4 py-2 rounded transition-colors
        ${getVariantClasses()}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
};
