import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.prod';
import { tarea, responseTarea } from '../../core/models/tarea.model';
import { Observable, catchError, map } from 'rxjs';
import { responseHttp } from '../roles/roles.service';

@Injectable({
    providedIn: 'root',
})
export class SoporteService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    apiUrl = environment.urlBase;
    router: any;

    GetAllTarea(): Observable<responseTarea> {

        return this.http.get<responseTarea>(`${this.apiUrl}Tarea/GetAllTarea`, this.httpOptions).pipe(
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

    GetallTareaByUsuario(idusuario:number): Observable<responseTarea> {

        return this.http.get<responseTarea>(`${this.apiUrl}Tarea/GetallTareaByUsuario/${idusuario}`, this.httpOptions).pipe(
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


    
    GetTareaById(idTarea: number): Observable<responseTarea> {

        return this.http.get<responseTarea>(`${this.apiUrl}Tarea/GetTareaById/${idTarea}`, this.httpOptions).pipe(
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

   
    Inserttarea(data: any) {//revisar back
        return this.http.post<any>(`${this.apiUrl}Tarea/InsertTarea`, JSON.stringify(data), this.httpOptions).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                throw error;
            })
        );
    }

    EditTarea(data: any) {//revisar back
        return this.http.post<any>(`${this.apiUrl}Tarea/EditTarea`, JSON.stringify(data), this.httpOptions).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                throw error;
            })
        );
    }

    

    DeleteTarea(data: any): Observable<responseHttp> {

        return this.http.post<any>(`${this.apiUrl}Tarea/DeleteTarea`, JSON.stringify(data), this.httpOptions).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                throw error;
            })
        );
    }
}