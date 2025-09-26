import React from 'react';
import { useApiStore } from '../stores/client.store';
import type { RequestBody } from '../types/client.type';

interface FormField {
  name: keyof RequestBody;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'password';
  required: boolean;
}

const FORM_FIELDS: FormField[] = [
  { name: 'tipoDte', label: 'Tipo DTE', type: 'text', required: true },
  { name: 'nit', label: 'NIT', type: 'text', required: true },
  { name: 'quantity', label: 'Cantidad', type: 'number', required: true },
  { name: 'passwordPri', label: 'Password Privado', type: 'password', required: true },
  { name: 'nrc', label: 'NRC', type: 'text', required: true },
  { name: 'nombre', label: 'Nombre', type: 'text', required: true },
  { name: 'codActividad', label: 'Código Actividad', type: 'text', required: true },
  { name: 'descActividad', label: 'Descripción Actividad', type: 'text', required: true },
  { name: 'token', label: 'Token', type: 'textarea', required: true }
];

export const RequestForm = () => {
  const { 
    formData, 
    updateFormData, 
    selectedDocumentType, 
    executeRequest, 
    isLoading, 
    resetForm 
  } = useApiStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    executeRequest();
  };

  if (!selectedDocumentType) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-700 font-medium">
          Por favor selecciona un tipo de documento primero
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Datos del Documento - {selectedDocumentType.toUpperCase()}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {FORM_FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={field.name}
              type={field.type}
              value={formData[field.name] as string | number}
              onChange={(e) => {
                const value = field.type === 'number' 
                  ? Number(e.target.value) 
                  : e.target.value;
                updateFormData(field.name, value);
              }}
              required={field.required}
              disabled={isLoading}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            />
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
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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