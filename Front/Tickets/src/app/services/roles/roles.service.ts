import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environment/environment.prod';
import { showtabletRoles } from '../../core/models/admin.model';

export interface responseHttp {
  isSuccess: boolean | null;
  messages: string | null;
  result: any;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiUrl = environment.urlBase;

  constructor(private http: HttpClient) {
  }


  getRoles() {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetAllRoles`
      )
      .pipe(
        map((dataResult) => {
       
          return dataResult;
        })
      );
  }

  getRolbyId(idRol: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetRolById/${idRol}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  getPermissions(){
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Permisos/GetAllPermisos`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  GetAllRolesActivos() {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetAllRolesActivos`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  GetRolById(id_Rol: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rols/GetRolById/${id_Rol}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  registerRol(data: any) {//revisar back
    return this.http.post<any>(`${this.apiUrl}Rol/InsertRol`, JSON.stringify(data), this.httpOptions).pipe(
      map((response) => {
        console.log('Respuesta de la API:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return of(false);
      })
    );
  }

  editRol(data: any) {//revisar back
    return this.http.post<any>(`${this.apiUrl}Rol/EditRol`, JSON.stringify(data), this.httpOptions).pipe(
      map((response) => {
        console.log('Respuesta de la API:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return of(false);
      })
    );
  }

  GetallUsuarioRoles(id_user: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetallUsuarioRoles/${id_user}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  GetusuarioRolById(idUsuarioRol: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetusuarioRolById/${idUsuarioRol}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  InsertUsuarioRol(data: any) {//revisar back
    return this.http.post<any>(`${this.apiUrl}Rol/InsertUsuarioRol`, JSON.stringify(data), this.httpOptions).pipe(
      map((response) => {
        console.log('Respuesta de la API:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return of(false);
      })
    );
  }

  EditUsuarioRol(data: any) {//revisar back
    return this.http.post<any>(`${this.apiUrl}Rol/EditUsuarioRol`, JSON.stringify(data), this.httpOptions).pipe(
      map((response) => {
        console.log('Respuesta de la API:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return of(false);
      })
    );
  }

  GetallRolesSeguridad(idRol: number, idModule: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetallRolesSeguridad/${idRol}/${idModule}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  GetallRolesSeguridadxRol(idRol: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/GetallRolesSeguridadxRol/${idRol}/`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  GetRolesSeguridadById() {

  }

  GetPermisoById(id_modulo: string, id_permiso: string) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Permisos/GetPermisoById/${id_modulo}?idPermiso=${id_permiso}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  InactiveModulo(idRol: number, idModulo: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/InactiveModulo/${idRol}/${idModulo}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  InsertRolesSeguridad(data: responseHttp) {
    return this.http.post<responseHttp>(`${this.apiUrl}Rol/InsertRolesSeguridad`, JSON.stringify(data), this.httpOptions).pipe(
      map((response) => {
        if (response.isSuccess) {
          console.log('Respuesta de la API:', response);
          return response.result; // Devuelve la respuesta exitosa
        } else {
          return of(false);
        }

      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error aquí si es necesario
        return of(false); // Devuelve false en caso de error en lugar de lanzar una excepción
      })
    );
  }

  deleteRoles(idRol: number) {
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/DeleteRolById/${idRol}`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  activateRol(idRol: number, status: string) {
    
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Rol/${status}/${idRol}/`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }

  GetAllModulos() {
    
    return this.http
      .get<responseHttp>(
        `${this.apiUrl}Permisos/GetAllModulos`
      )
      .pipe(
        map((dataResult) => {
          return dataResult;
        })
      );
  }


  EditRolesSeguridad(data: any) {
    return this.http.post<responseHttp>(`${this.apiUrl}Rol/EditRol`, JSON.stringify(data), this.httpOptions).pipe(
      map((response) => {
        console.log('Respuesta de la API:', response);
        return response; // Devuelve la respuesta exitosa
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        // Puedes manejar el error aquí si es necesario
        return of(false); // Devuelve false en caso de error en lugar de lanzar una excepción
      })
    );
  }

}
