import type { FormField } from "../types/client.types";

export const FORM_FIELDS: FormField[] = [
  {
    name: "tipoDte",
    label: "Tipo DTE",
    type: "text",
    required: true,
    placeholder: "01",
  },
  {
    name: "nit",
    label: "NIT",
    type: "text",
    required: true,
    placeholder: "06142752450017",
  },
  {
    name: "quantity",
    label: "Cantidad",
    type: "number",
    required: true,
    placeholder: "1",
  },
  {
    name: "passwordPri",
    label: "Password",
    type: "text",
    required: true,
    placeholder: "Contraseña de certificado",
  },
  {
    name: "nrc",
    label: "NRC",
    type: "text",
    required: true,
    placeholder: "123456",
  },
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    required: true,
    placeholder: "Empresa S.A. de C.V.",
  },
  {
    name: "codActividad",
    label: "Código Actividad",
    type: "text",
    required: true,
    placeholder: "62010",
  },
  {
    name: "descActividad",
    label: "Descripción Actividad",
    type: "text",
    required: true,
    placeholder: "Servicio de transporte",
  },
  {
    name: "token",
    label: "Token",
    type: "textarea",
    required: true,
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },
];