export interface responseTarea {
    isSuccess: boolean | null;
    messages: string | null;
    result: []
}

export interface tarea {
    idTarea:number;
    fechaRegistro: any;
    fechaEntrega:any;
    estado:string;
    descripcion: string;
    idusuario: number;
    nombreUsuario: string;
    isSucess: boolean;
    message: string;
    
    
}