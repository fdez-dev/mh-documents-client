import type { DocumentType } from "../types/api.types";

export const ENDPOINT_URLS: Record<DocumentType, string> = {
  fe: "/create-fe",
  nc: "/create-nc",
  nd: "/create-nd",
  fse: "/create-fse",
  nre: "/create-nre",
  ctn: "/create-ctn",
  anulation: "/anulation",
};