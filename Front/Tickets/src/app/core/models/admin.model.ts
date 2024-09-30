export interface responseRoles {
  isSuccess: boolean | null;
  messages: string | null;
  result: responseRolesResult[];
}

export interface responseRolesResult {
  idRol: number;
  descripcion: string;
  messages: string;
  isSuccess: boolean;
  detalle?: string;
  activate?: number;
  activo?: number;
  desOpcion?: string | '';
  desAcceso?: string | '';
  idAcceso: number;
  idAccesos: number;
  idOpcion?: number;
  permisos?: permisosResult[];
  name: string;
  estado?: number | 0;
  id: number |0;
  modulos: any
}

export interface permisosResult {
  idAccesos: number;
  descripcion: string;
  detalle: string;
  activo?: number;
}

export interface permiResponse {
  idRolesSeguridad: number;
  idRol: number;
  idOpcion: number;
  isSuccess: boolean | false;
  descRol: string;
  desOpcion: string;
  messages: string;
  detalleRol: string;
  permisos: any[];
}

export interface showtabletRoles {
 
  descripcion: string;
   idRol: string;
  selected?: boolean;
  detalle?: string;
  activate?: number;
  
  isSuccess?: boolean;
  messages?: string;
  permisos?: [];
 
  id?: string;
  idOpciones?: number;
  idAccesos?: string |'';
}

export interface responseHttp {
  isSuccess: boolean | null;
  messages: string | null;
  result: any[];
}

export interface responseDate {
  isSuccess: boolean | null;
  messages: string | null;
  result: {
    fecharesponse: string
  }
}

export interface responsegetAllUser {
  isSuccess: boolean | null;
  messages: string | null;
  result: responseUserResult[];
}

export interface responseUserResult {
  accessFailedCount: number;
  apellidos: string;
  autorizoCorreo: number;
  autorizoTratamiento: number;
  concurrencyStamp: string;
  contraseña: string;
  correoElectronico: string;
  descEstado: string;
  email: string;
  emailConfirmed: boolean;
  estado: number;
  fechaRegistro: Date;
  id: string;
  idCiudad: number;
  idOrganizacion: number;
  idTipoDocumento: number;
  idUsuario: number;
  imagen: string;
  isSuccess: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: string;
  messages: string;
  nombres: string;
  normalizedEmail: boolean;
  normalizedUserName: boolean;
  numeroDocumento: number;
  passwordHash: boolean;
  phoneNumber: number;
  phoneNumberConfirmed: boolean;
  securityStamp: string;
  twoFactorEnabled: boolean;
  userName: string;
  validado: string;
}

export interface showTableUsers {
  nombres: string;
  apellidos: string;
  correoElectronico: string;
  fechaRegistro: Date;
  idCiudad: number;
  idOrganizacion: number;
  numeroDocumento: number;
  phoneNumber: number;
  userName: string;
  idUsuario: number;
  activate?: number;
  tipoDoc?: number;
}

export interface module {
  descripcion: string;
  idOpciones: number;
  isSuccess: boolean;
  messages: string;
}
