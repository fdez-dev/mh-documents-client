import { useApiStore } from '../stores/client.store';
import type { ApiResult } from '../types/client.types';

export const ResponseBox = () => {
  const { response, error, isLoading, clearResponse } = useApiStore();

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center text-blue-700">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-medium">Procesando documento...</span>
        </div>
      </div>
    );
  }

  // ✅ CAMBIO: Usar ApiResult en lugar de 'any'
  if (response?.data?.results) {
    const failedResult = response.data.results.find((result: ApiResult) => result.ok === false);
    if (failedResult) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-red-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Error en el documento</span>
            </div>
            <button 
              onClick={clearResponse}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2 text-red-600">
            <p><strong>Mensaje:</strong> {failedResult.message}</p>
            <p><strong>Error:</strong> {failedResult.error}</p>
          </div>
          
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-red-600 font-medium">Ver respuesta completa</summary>
            <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </details>
        </div>
      );
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-red-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Error</span>
          </div>
          <button 
            onClick={clearResponse}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            ×
          </button>
        </div>
        <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (response) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-green-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Éxito (Status: {response.status})</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-600">
              {response.timestamp.toLocaleTimeString()}
            </span>
            <button 
              onClick={clearResponse}
              className="text-green-500 hover:text-green-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        </div>
        <pre className="bg-green-100 p-3 rounded text-xs overflow-x-auto">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
      <div className="text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <p className="font-medium">Completa el formulario y envía para ver la respuesta</p>
      </div>
    </div>
  );
};