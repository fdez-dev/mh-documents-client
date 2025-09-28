import React from "react";
import { useApiStore } from "../stores/client.store";
import type { FormField } from "../types/client.types";

const FORM_FIELDS: FormField[] = [
  {
    name: "tipoDte",
    label: "Tipo DTE",
    type: "text",
    required: true,
    placeholder: "01",
  },
  {
    name: "nit",
    label: "NIT",
    type: "text",
    required: true,
    placeholder: "06142752450017",
  },
  {
    name: "quantity",
    label: "Cantidad",
    type: "number",
    required: true,
    placeholder: "1",
  },
  {
    name: "passwordPri",
    label: "Password",
    type: "text",
    required: true,
    placeholder: "Contraseña de certificado",
  },
  {
    name: "nrc",
    label: "NRC",
    type: "text",
    required: true,
    placeholder: "123456",
  },
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    required: true,
    placeholder: "Empresa S.A. de C.V.",
  },
  {
    name: "codActividad",
    label: "Código Actividad",
    type: "text",
    required: true,
    placeholder: "62010",
  },
  {
    name: "descActividad",
    label: "Descripción Actividad",
    type: "text",
    required: true,
    placeholder: "Servicio de transporte",
  },
  {
    name: "token",
    label: "Token",
    type: "textarea",
    required: true,
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },
];

const DOCUMENT_OPTIONS = [
  { value: "fe", label: "Factura Electrónica (FE)" },
  { value: "ccf", label: "Crédito Fiscal (CCF)" },
  { value: "nc", label: "Nota de Crédito (NC)" },
  { value: "nd", label: "Nota de Débito (ND)" },
  { value: "fse", label: "Factura Sujeto Excluido (FSE)" },
  { value: "nre", label: "Nota de Recepción (NRE)" },
  { value: "ctn", label: "Comprobante Técnico (CTN)" },
  { value: "anulation", label: "Anulación" },
];

const NumericInput = ({
  value,
  onChange,
  placeholder,
  required,
  disabled,
  maxLength,
  id,
}: {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  id?: string;
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

export const RequestForm = () => {
  const {
    formData,
    updateFormData,
    selectedDocumentType,
    setDocumentType,
    executeRequest,
    isLoading,
    resetForm,
  } = useApiStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    executeRequest();
  };

  if (!selectedDocumentType) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label
            htmlFor="document-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tipo de Documento:
          </label>
          <select
            id="document-select"
            value={selectedDocumentType || ""}
            onChange={(e) => setDocumentType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          >
            <option value="">-- Selecciona un tipo de documento --</option>
            {DOCUMENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-700 font-medium">
            Por favor selecciona un tipo de documento para mostrar el formulario
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <label
          htmlFor="document-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tipo de Documento:
        </label>
        <select
          id="document-select"
          value={selectedDocumentType}
          onChange={(e) => setDocumentType(e.target.value as any)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {DOCUMENT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Datos del Documento - {selectedDocumentType.toUpperCase()}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {FORM_FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                value={formData[field.name] as string}
                onChange={(e) => updateFormData(field.name, e.target.value)}
                required={field.required}
                disabled={isLoading}
                placeholder={field.placeholder}
                rows={3}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-150 ease-in-out placeholder-gray-400"
              />
            ) : ["tipoDte","nit", "nrc", "codActividad"].includes(field.name) ? (
              <NumericInput
                id={field.name}
                value={formData[field.name] as string | number}
                onChange={(value) =>
                  updateFormData(
                    field.name,
                    field.type === "number" ? Number(value) : value
                  )
                }
                placeholder={field.placeholder}
                required={field.required}
                disabled={isLoading}
                maxLength={
                  field.name === "tipoDte" ? 2 :
                  field.name === "nit" ? 14 : 
                  field.name === "nrc" ? 6 : 
                  5
                }
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                value={formData[field.name] as string | number}
                onChange={(e) => {
                  const value =
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value;
                  updateFormData(field.name, value);
                }}
                required={field.required}
                disabled={isLoading}
                placeholder={field.placeholder}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-150 ease-in-out placeholder-gray-400"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end border-t pt-4">
        <button
          type="button"
          onClick={resetForm}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          Limpiar Formulario
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            `Generar ${selectedDocumentType.toUpperCase()}`
          )}
        </button>
      </div>
    </form>
  );
};
