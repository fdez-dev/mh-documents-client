import type { DocumentType } from "../types/api.types";

export const DOCUMENT_OPTIONS: { value: DocumentType; label: string }[] = [
  { value: "fe", label: "Factura Electrónica (FE)" },
  { value: "nc", label: "Nota de Crédito (NC)" },
  { value: "nd", label: "Nota de Débito (ND)" },
  { value: "fse", label: "Factura Sujeto Excluido (FSE)" },
  { value: "nre", label: "Nota de Recepción (NRE)" },
  { value: "ctn", label: "Comprobante Técnico (CTN)" },
  { value: "anulation", label: "Anulación" },
];