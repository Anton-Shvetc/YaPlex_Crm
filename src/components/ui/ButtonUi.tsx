"use client";

import { getVariantClasses } from "@/utils/ui/getVariantClasses";
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
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        px-4 py-2 rounded transition-colors
        ${getVariantClasses(variant)}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
};
