import React from 'react';
import { useApiStore } from '../stores/client.store';

const DOCUMENT_OPTIONS = [
  { value: 'fe', label: 'Factura Electrónica (FE)' },
  { value: 'ccf', label: 'Crédito Fiscal (CCF)' },
  { value: 'nc', label: 'Nota de Crédito (NC)' },
  { value: 'nd', label: 'Nota de Débito (ND)' },
  { value: 'fse', label: 'Factura Sujeto Excluido (FSE)' },
  { value: 'nre', label: 'Nota de Recepción (NRE)' },
  { value: 'ctn', label: 'Comprobante Técnico (CTN)' },
  { value: 'anulation', label: 'Anulación' }
];

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