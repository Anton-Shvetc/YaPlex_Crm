// components/ui/InputField.tsx
import React, { InputHTMLAttributes, forwardRef, useState } from "react";

// Типы пропсов
type InputFieldProps = {
  label?: string;
  error?: string;
  helpText?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

// Цветовые переменные (можно вынести в отдельный файл)
const colors = {
  border: {
    default: "#D1D5DB", // gray-300
    focus: "#3B82F6", // blue-500
    error: "#EF4444", // red-500
  },
  text: {
    error: "#EF4444", // red-500
  },
};

export const InputFieldUi = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      type = "text",
      className = "",
      inputClassName = "",
      labelClassName = "",
      errorClassName = "",
      helpText,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const getBorderClasses = () => {
      if (error) return "border-red-500";
      if (isFocused) return "border-blue-500";
      return "border-gray-300";
    };

    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={`
            w-full px-3 py-2 
            border border-solid ${getBorderClasses()}
            rounded-[4px] shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-[${colors.border.focus}]
            transition-colors duration-200
            ${inputClassName}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {helpText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helpText}</p>
        )}

        {error && (
          <p className={`mt-1 text-xs text-red-500 ${errorClassName}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputFieldUi.displayName = "InputField";

