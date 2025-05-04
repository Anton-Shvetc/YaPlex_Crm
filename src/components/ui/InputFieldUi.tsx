import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import {
  Label,
  Input,
  Textarea,
  Description,
  Field as HeadlessField,
} from "@headlessui/react";

type InputFieldProps = {
  label?: string;
  error?: string;
  helpText?: string;
  rows?: number;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

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
      placeholder = undefined,
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
      return "border-gray-300 dark:border-gray-600";
    };

    return (
      <HeadlessField className={`mb-4 ${className}`}>
        {label && (
          <Label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 ${labelClassName}`}
          >
            {label}
          </Label>
        )}

        {type === "textarea" ? (
          <Textarea className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600" />
        ) : (
          <Input
            ref={ref}
            type={type}
            className={`
   w-full px-3 py-2 
   border border-solid ${getBorderClasses()}
   rounded-[4px] shadow-sm 
   bg-white dark:bg-gray-700
   text-gray-900 dark:text-white
   placeholder-gray-400 dark:placeholder-gray-500
   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
   transition-colors duration-200
   ${inputClassName}
 `}
            placeholder={placeholder || label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        )}

        {helpText && !error && (
          <Description className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {helpText}
          </Description>
        )}

        {error && (
          <Description
            className={`mt-1 text-xs text-red-500 dark:text-red-400 ${errorClassName}`}
          >
            {error}
          </Description>
        )}
      </HeadlessField>
    );
  }
);

InputFieldUi.displayName = "InputField";
