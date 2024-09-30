export interface matrizllenaModel {
  actividadDescripcion?: string;
  componenteDescripcion?: string;
  equivalencia?: string;
  grupoDescripcion?: string;
  idActividad: number;
  idComponente: number;
  idGrupo: number;
  idMatriz: number;
  idMetodo: number;
  idParametrosAcreditacion: number;
  idTecnica: number;
  idVariable: number;
  matrizDescripcion?: string;
  metodoDescripcion?: string;
  tecnicaDescripcion?: string;
  variableDescripcion?: string;
}

export interface Roles {
  
  descripcion: string;
  idRol: number;
  isSuccess: boolean;
  messages: string;
  
}

export interface Regionales {
  codigo: number;
  descEstado: string;
  descripcion: string;
  estado: number;
  fechaModificacion: string;
  fechaRegistro: string;
  isSuccess: boolean;
  messages: string;
  nombre: string;
  usuarioModificacion: string;
  usuarioRegistro: string;
}

export interface Estrategias {
  codigo: number;
  nombre: string;
  descripcion: string;
  vigencia: number;
  regional: [];
  estado: number;
  descEstado: string;
  equiposTrabajo: [];
  fechaRegistro: string;
  fechaModificacion: string;
  usuarioRegistro: string;
  usuarioModificacion: string;
  message: string;
  isSuccess: boolean;
}

export interface Iniciativas {
  codigo: number;
  nombre: string;
  descripcion: string;
  estCodigo: number;
  descEstrategia: string;
  vigencia: number
  estado: number;
  descEstado: string;
  fechaRegistro: string;
  fechaModificacion: string;
  usuarioRegistro: string;
  usuarioModificacion: string;
}

export interface Acciones {
  codigo: number;
  nombre: string;
  descripcion: string;
  iniCodigo: number;
  descIniciativa: string;
  vigencia: number
  reqEvidencia: string;
  estado: number;
  descEstado: string;
  fechaRegistro: string;
  fechaModificacion: string;
  usuarioRegistro: string;
  usuarioModificacion: string;
}

export interface Temas {
  idestrategia: number;
  nombre: string;
  descripcion: string;
  vigencia: number
  estado: number;
  descEstado: string;
  fechaRegistro: string;
  fechaModificacion: string;
  usuarioRegistro: string;
  usuarioModificacion: string;
  messages: string;
  isSuccess: boolean;
}

export interface equipos {
  codigo: number;
  nombre: string;
  descripcion: string;
  estado: number;
  usuarioRegistro: string;
  fechaRegistro: string;
  usuarioModificacion: string;
  fechaModificacion: string;
  descEstado: string;
  message?: string;
  isSucess?: string;
}

export interface estadoAcvitidad {
  codigo: number;
  descripcion: string;
  color: string;
}

