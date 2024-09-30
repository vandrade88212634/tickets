export interface responseUser {
    isSuccess: boolean | null;
    messages: string | null;
    result: []
}

export interface User {
    idusuario: number;
    nombre: string;
    usuario: string;
    cedula: number;
       idRol: number
    descRol: string;
    messages: string;
    isSuccess: boolean;
}