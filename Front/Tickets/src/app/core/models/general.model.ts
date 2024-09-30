export interface Message {
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface IntfSnackba {
  message: string | '';
  action: string | '';
  panelClass: string | string[];
}

export interface Item {
  id: number;
  descripcion: string;
  // Agrega cualquier otra propiedad que sea relevante
}

export interface OrigenAutorizacionAcreditacion {
  opcn: 'verSolicitud' | 'editarSolicitud' | 'editarSolicitud' | 'editarOrganizacion';
}

//1= Editar Organización // 2 Crear o editar solicitud // 3 = consultar solicitud;

export interface Cities {
  idCiudad: number;
  idDepartamento: number;
  codigoDANECiudad: string;
  nombre: string;
}

export interface Actividades {
  idActividad: number,
  idMatriz: number,
  idComponent: number,
  descripcion: string,
}

export interface Equipos {
  idClaseEquipo: number,
  descripcion: string
}

export interface Item {
  id: number;
  descripcion: string;
  // Agrega cualquier otra propiedad que sea relevante
}

export interface ResponseTypeDocument {
  isSuccess: boolean;
  messages: string;
  result: [
    {
      id: 1;
      descripcion: string;
    }
  ];
}

export interface ResponseTypeQuejas {
  isSuccess: boolean;
  messages: string;
  result: [
    {
      idTipoQuejas: 1;
      descripcion: string;
    }
  ];
}

export interface ReposeAllCities {
  isSuccess: boolean;
  messages: string;
  result: [
    {
      idCiudad: number;
      idDepartamento: number;
      codigoDANECiudad: string;
      nombre: string;
    }
  ];
}

export interface headerTable {
  name: string;
  descripcion: string;
}
export interface actionTable {
  icon: string;
  id: number;
  msg?: string;
}

export interface cargeFile {
  idDocumentosFlujo: number;
  idFlujoTrabajo: number;
  radicado: string;
  descripcion: string;
  camino: string;
  docBase64: string;
}

interface Contacto {
  contacto: string;
  nombres: string;
  telefonos: string;
}

export interface NotificationResponse {
  isSuccess: boolean;
  messages: string;
  result: {
    notificaciones: Notification[];
  };
}

export interface Notification {
  tipoNotificacion: string;
  titulo: string;
  descripcion: string;
  ago: string;
}