import { create } from "zustand";
import type { RequestBody } from "../types/api.types";
import type { ApiStore } from "../types/store.types";
import { ApiService } from "../services/document.service";

const initialFormData: RequestBody = {
  tipoDte: "",
  nit: "",
  quantity: 1,
  passwordPri: "",
  nrc: "",
  nombre: "",
  codActividad: "",
  descActividad: "",
  token: "",
};

export const useApiStore = create<ApiStore>((set, get) => ({
  formData: { ...initialFormData },
  selectedDocumentType: null,
  isLoading: false,
  response: null,
  error: null,

  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  setDocumentType: (type) =>
    set({
      selectedDocumentType: type,
      error: null,
      response: null,
    }),

  executeRequest: async () => {
    const { selectedDocumentType, formData } = get();

    if (!selectedDocumentType) {
      set({ error: "Por favor selecciona un tipo de documento" });
      return;
    }

    set({ isLoading: true, error: null, response: null });

    try {
      const response = await ApiService.executeRequest(
        selectedDocumentType,
        formData
      );
      set({ response, isLoading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  clearResponse: () => set({ response: null, error: null }),

  resetForm: () =>
    set({
      formData: { ...initialFormData },
      selectedDocumentType: null,
      response: null,
      error: null,
    }),
}));
