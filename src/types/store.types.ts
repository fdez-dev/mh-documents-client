import type { DocumentType, RequestBody, ApiResponse } from "./api.types";

export interface ApiStore {
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
