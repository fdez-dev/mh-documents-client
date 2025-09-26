import { create } from 'zustand';
import type { DocumentType, RequestBody, ApiResponse } from '../types/client.type';
import { apiService } from '../services/client.service';

interface ApiStore {

  formData: RequestBody;
  
  selectedDocumentType: DocumentType | null;
  isLoading: boolean;
  response: ApiResponse | null;
  error: string | null;
  
  updateFormData: (field: keyof RequestBody, value: string | number) => void;
  setDocumentType: (type: DocumentType) => void;
  executeRequest: () => Promise<void>;
  clearResponse: () => void;
  resetForm: () => void;
}

const initialFormData: RequestBody = {
  tipoDte: '',
  nit: '',
  quantity: 1,
  passwordPri: '',
  nrc: '',
  nombre: '',
  codActividad: '',
  descActividad: '', 
  token: ''
};

export const useApiStore = create<ApiStore>((set, get) => ({
  formData: { ...initialFormData },
  selectedDocumentType: null,
  isLoading: false,
  response: null,
  error: null,
  
  updateFormData: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  })),
  
  setDocumentType: (type) => set({ 
    selectedDocumentType: type,
    error: null,
    response: null
  }),
  
  executeRequest: async () => {
    const { selectedDocumentType, formData } = get();
    
    if (!selectedDocumentType) {
      set({ error: 'Por favor selecciona un tipo de documento' });
      return;
    }
    
    set({ isLoading: true, error: null, response: null });
    
    try {
      const response = await apiService.executeRequest(selectedDocumentType, formData);
      set({ response, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  clearResponse: () => set({ response: null, error: null }),
  
  resetForm: () => set({ 
    formData: { ...initialFormData },
    selectedDocumentType: null,
    response: null,
    error: null 
  })
}));