import React from 'react';
import { useApiStore } from '../stores/client.store';
import { DOCUMENT_OPTIONS } from "../constants/document.options";

export const SelectDocument = () => {
  const { selectedDocumentType, setDocumentType } = useApiStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setDocumentType(type as any);
  };

  return (
    <div className="select-document mb-6">
      <label 
        htmlFor="document-select" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Tipo de Documento:
      </label>
      <select 
        id="document-select"
        value={selectedDocumentType || ''}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      >
        <option value="">-- Selecciona un tipo de documento --</option>
        {DOCUMENT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};