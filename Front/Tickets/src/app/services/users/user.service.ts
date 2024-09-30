import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.prod';
import { User, responseUser } from '../../core/models/user.model';
import { Observable, catchError, map } from 'rxjs';
import { responseHttp } from '../roles/roles.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    apiUrl = environment.urlBase;
    router: any;

    GetAllUser(): Observable<responseUser> {

        return this.http.get<responseUser>(`${this.apiUrl}Usuarios/GetAllUser`, this.httpOptions).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                // Puedes manejar el error aquí si es necesario
                throw error; // Lanza el error en lugar de retornar 'false'
            })
        );
    }

    GetUserById(idUsuario: number): Observable<responseUser> {

        return this.http.get<responseUser>(`${this.apiUrl}Usuarios/GetUserById/${idUsuario}`, this.httpOptions).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                // Puedes manejar el error aquí si es necesario
                throw error; // Lanza el error en lugar de retornar 'false'
            })
        );
    }

    GetAllRegionalActivos(): Observable<responseHttp> {

        return this.http.get<responseHttp>(`${this.apiUrl}Usuarios/GetAllRegionalActivos`, this.httpOptions).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                // Puedes manejar el error aquí si es necesario
                throw error; // Lanza el error en lugar de retornar 'false'
            })
        );
    }

    Insertusuario(data: any) {//revisar back
        return this.http.post<any>(`${this.apiUrl}Usuarios/Insertusuario`, JSON.stringify(data), this.httpOptions).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                throw error;
            })
        );
    }

    Editusuario(data: any) {//revisar back
        return this.http.post<any>(`${this.apiUrl}Usuarios/Editusuario`, JSON.stringify(data), this.httpOptions).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                throw error;
            })
        );
    }

    ActivateUser(cedula: string): Observable<responseHttp> {

        return this.http.get<responseHttp>(`${this.apiUrl}Usuarios/ActivateUser/${cedula}`, this.httpOptions).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                // Puedes manejar el error aquí si es necesario
                throw error; // Lanza el error en lugar de retornar 'false'
            })
        );
    }

    InactivateUser(cedula: string): Observable<responseHttp> {

        return this.http.get<responseHttp>(`${this.apiUrl}Usuarios/InactivateUser/${cedula}`, this.httpOptions).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                // Puedes manejar el error aquí si es necesario
                throw error; // Lanza el error en lugar de retornar 'false'
            })
        );
    }

    DeleteUser(idUsuario: number): Observable<responseHttp> {

        return this.http.get<responseHttp>(`${this.apiUrl}Usuarios/DeleteUser/${idUsuario}`, this.httpOptions).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                // Puedes manejar el error aquí si es necesario
                throw error; // Lanza el error en lugar de retornar 'false'
            })
        );
    }
}