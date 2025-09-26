export type DocumentType = 'fe' | 'nc' | 'nd' | 'fse' | 'nre' | 'ctn' | 'anulation';

export interface RequestBody {
  tipoDte: string;        // ← NUEVO campo
  nit: string;
  quantity: number;
  passwordPri: string;
  nrc: string;
  nombre: string;
  codActividad: string;
  descActividad: string;
  token: string;
}

export interface ApiResponse {
  data: any;
  status: number;
  statusText: string;
  timestamp: Date;
}