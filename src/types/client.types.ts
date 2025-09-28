export type DocumentType = 'fe' | 'nc' | 'nd' | 'fse' | 'nre' | 'ctn' | 'anulation';

export interface RequestBody {
  tipoDte: string;
  nit: string;
  quantity: number;
  passwordPri: string;
  nrc: string;
  nombre: string;
  codActividad: string;
  descActividad: string;
  token: string;
}

//Tipado específico para los resultados individuales
export interface ApiResult {
  ok: boolean;
  message: string;
  error?: string;
}

//Tipado específico para la respuesta de la API
export interface ApiResponseData {
  ok: boolean;
  status: number;
  message: string;
  results?: ApiResult[];
}

//Tipado completo de la respuesta
export interface ApiResponse {
  data: ApiResponseData;
  status: number;
  statusText: string;
  timestamp: Date;
}

export interface FormField {
  name: keyof RequestBody;
  label: string;
  type: "text" | "textarea" | "number" | "password";
  required: boolean;
  placeholder: string;
}
