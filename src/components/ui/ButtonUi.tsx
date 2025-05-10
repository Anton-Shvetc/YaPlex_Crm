"use client";

import { getVariantClasses } from "@/utils/ui/getVariantClasses";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "default" | "link";
  fullWidth?: boolean;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const ButtonUi: React.FC<ButtonUiProps> = ({
  variant = "default",
  fullWidth = false,
  type = "button",
  className = "",
  label = "Подтвердить",
  size = "md",
  disabled = false,
  ...props
}) => {
  // Классы для разных размеров
  const sizeClasses = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6"
  };
  
  // Если это link-кнопка, не применяем размерные классы для padding
  const applySizeClasses = variant !== "link" ? sizeClasses[size] : "text-sm";
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        rounded transition-colors cursor-pointer
        ${getVariantClasses(variant)}
        ${applySizeClasses}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
};
