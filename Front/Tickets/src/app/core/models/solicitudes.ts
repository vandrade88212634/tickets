export interface ApiResponse {
  isSuccess: boolean | null;
  messages: string | null;
  result: {};
}

export interface evaluacionConformidadRequest {
  idSolicitud: number;
  tipoSolicitud?: string;
  razonsocial?: string;
  nit: number;
  direccion: string;
  departamento: number;
  ciudad: number;
  telefono: numerotelefono[];
  email: email[];
  date: Date;
  paso: number; // 1, 2 o 3
  paasoDescripcion: string;
  updateDate: Date;
}

export interface dataSede {
  idSolicitud: number;
  sedes: dataSedeItem[];
}

export interface dataSedeItem {
  laboratorio: string;
  direccion: string;
  departamento: number;
  ciudad: number;
  telefono: numerotelefono[];
  email: email[];
}

export interface file {
  id: number;
  name: string;
  base64: string;
}

export interface identificacionOrganismo1 {
  idSolicitud: number;
  rut?: file;
  camaradecmercio?: file;
  matriculaMercantil: file;
}

export interface identificacionOrganismo {
  paso1: identificacionOrganismoPaso1;
  paso2: identificacionOrganismoPaso2;
  paso3: identificacionOrganismoPaso3;
}

export interface tipoOrganiList {
  isSuccess: true,
  messages: "Proceso realizado éxitosamente",
  result: tipoOrganiListResult[]
}

export interface tipoOrganiListResult {
  idTipoOrganizacion: number,
  descripcion: string,
}

export interface identificacionOrganismoPaso1 {
  idSolicitud: number;
  tipoSolicitud: number;
  razonsocial: string;
  nit: number;
  direccion: string;
  departamento: number;
  ciudad: number;
  telefonos: numerotelefono[];
  emails: email[];
  date: string;
  paso: number;
  pasoDescipcion: number;
  updateDate: string;
  usuarioCreacion: string;
}

export interface identificacionOrganismoPaso2 {
  idSolicitud: number;
  tipoSolicitud: number;
  sedes: sedes[];
  date: string;
  paso: number;
  pasoDescipcion: string;
}

export interface identificacionOrganismoPaso3 {
  idSolicitud: number;
  rut: file;
  camaraComercio: file;
  matriculaMercantil: file;
  date: string;
  paso: number;
  pasoDescipcion: string;
  usuarioCreacion: string;
}

export interface sedes {
  laboratorio: string;
  direccion: string;
  departamento: number;
  ciudad: number;
  telefonos: numerotelefono[];
  emails: email[];
  date: string;
  usuarioCreacion: string;
}

export interface numerotelefono {
  numeroTelefono: string;
}

export interface email {
  descripcionEmail: string;
}

export interface representanteLegal {
  idSolicitud: number;
  docIdentificacionTitular: file;
  identidadSuplenteApoderando: file;
  DocCertificadoNombramiento: file;
}

export interface conflictosInteres {
  //
  idSolicitud: number;
  hautilizadoservcioscnsultoria: boolean;
  harealizadoauditoriaexterna: boolean;
  dataAuditoria?: dataAuditoriaConsultoria[];
  dataConsultoria?: dataAuditoriaConsultoria[];
}

export interface dataAuditoriaConsultoria {
  representantelegal?: string;
  tipodepersona?: number;
  asesorConsultor?: string;
  fechaInformeFinal?: Date;
  representanteLegal?: string;
}

export interface ActiveMatrizllena {
  idSolicitud: number;
  matrices: MatrizllenaItem;
}

export interface MatrizllenaItem {
  idMatriz: number;
  idComponente: number;
  idActividad: number;
  idGrupo: number;
  idVariable: number;
  idTecnica: number;
  idMetodo: number;
}

export interface talentoHumano {
  idSolicitud: number;
  persons: person[];
}

export interface person {
  idUsuario: string;
  nombre: string;
  idCargo: string;
  cargo: string;
  fechaAUTORIZACIÓN: Date;
}

export interface firmaYenvio {
  idSolicitud: number;
  responsable: string;
  cargo: string;
  DocumentoSolicitud: file;
}

export interface conflictoInteres {
  representanteLegal: string,
  tipoPersona: string,
  nombreAsesor: string,
  fechaInformeFinal: string,
  nombreLaboratorio: string,
  direccion: string,
  departamento: string
}
