import React from "react";
import type { NumericInputProps } from "../types/form.types";

export const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  placeholder,
  required,
  disabled,
  maxLength,
  id,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (!maxLength || numericValue.length <= maxLength) {
      onChange(numericValue);
    }
  };

  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-150 ease-in-out placeholder-gray-400"
    />
  );
};
