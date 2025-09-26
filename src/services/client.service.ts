import axios from 'axios';
import type { DocumentType, RequestBody, ApiResponse } from '../types/client.type';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.14:5000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mapeo de tipos de documento a URLs
const ENDPOINT_URLS: Record<DocumentType, string> = {
  fe: '/create-fe', 
  nc: '/create-nc',
  nd: '/create-nd',
  fse: '/create-fse',
  nre: '/create-nre',
  ctn: '/create-ctn',
  anulation: '/anulation' 
};

export const apiService = {
  executeRequest: async (
    documentType: DocumentType, 
    body: RequestBody
  ): Promise<ApiResponse> => {
    const url = ENDPOINT_URLS[documentType];
    const startTime = Date.now();
    
    try {
      const response = await apiClient.post(url, body);
      
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        timestamp: new Date(startTime),
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message ||
                          'Error desconocido al procesar la solicitud';
      throw new Error(errorMessage);
    }
  },
};