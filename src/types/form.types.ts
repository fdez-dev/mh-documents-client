import type { RequestBody } from "./api.types";

export interface FormField {
  name: keyof RequestBody;
  label: string;
  type: "text" | "textarea" | "number" | "password";
  required: boolean;
  placeholder: string;
}

export interface NumericInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  id?: string;
}
