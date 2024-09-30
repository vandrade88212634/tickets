import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.prod';import { responseLogin } from '../../core/models/auth.model';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginFirstService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiUrl = environment.urlBase;
  router: any;

  login_first(email: string, password: string): Observable<responseLogin> {

    const data = { user: email, password: password };

    return this.http.post<responseLogin>(`${this.apiUrl}Usuarios/Autentication`, JSON.stringify(data), this.httpOptions).pipe(
      map((result) => {
        console.log(result);
        if (result.isSuccess || result.messages == 'El usuario no esta activo') {

        }
        return result;
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error aquí si es necesario
        throw error; // Lanza el error en lugar de retornar 'false'
      })
    );
  }

  send_email_change_password(email:string){

    const data = { texto: email};

      return this.http.post<responseLogin>(`${this.apiUrl}Usuarios/remenber`, JSON.stringify(data), this.httpOptions).pipe(
        map((result) => {
          return result;
        }),
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          throw error; 
        })
      );
    }

  reset_password(email: string, password: string): Observable<responseLogin> {

    const data = { user: email, password: password };

    return this.http.post<responseLogin>(`${this.apiUrl}Usuarios/Autentication`, JSON.stringify(data), this.httpOptions).pipe(
      map((result) => {
        console.log(result);
        if (result.isSuccess || result.messages == 'El usuario no esta activo') {

        }
        return result;
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error; 
      })
    );
  }

  ChangePassword(data:any): Observable<responseLogin> {

    return this.http.post<responseLogin>(`${this.apiUrl}Usuarios/ChangePassword`, JSON.stringify(data), this.httpOptions).pipe(
      map((result) => {
        console.log(result);
        if (result.isSuccess || result.messages == 'El usuario no esta activo') {

        }
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

