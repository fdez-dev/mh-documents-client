import axios, { isAxiosError } from "axios";
import type { DocumentType, RequestBody, ApiResponse } from "../types/api.types";
import { ENDPOINT_URLS } from "../constants/api.constants";

const apiClient = axios.create({
  baseURL: "http://192.168.0.14:5000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
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
    } catch (error: unknown) {
      let errorMessage = "Error desconocido al procesar la solicitud";

      if (isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  },
};
