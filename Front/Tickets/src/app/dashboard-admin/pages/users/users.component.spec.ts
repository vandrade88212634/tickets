import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { Regionales, Roles } from '../../../core/models/parameters';
import { of } from 'rxjs';

const ELEMENT_DATA_USER: User[] = [{
  "idusuario": 3,
  "nombre": "bBHooeEsjE4EfRYI8oqsWxXwpOoMrtAAdhavSXRxCT0=",
  "usuario": "0+gFQXmiMKyVsO+Gnmx1RA==",
  "cedula": "d5FYmMzlxRVeFX6cM6/6YQ==",
  "correoElectronico": "qLFm8lZNVCUbWL5AnNM+adLn/Qyq0Me0T4ejmIsLqM8=",
  "estado": 1,
  "descEstado": "Activo",
  "idRol": 1,
  "descRol": "Super Administrador",
  "tipoUsu": 3,
  "regCodigo": 1,
  "descRegional": "Cúcuta",
  "telefono": "6OlQgbs5O1X59eHqaD1ong==",
  "contrasena": "",
  "fechaIni": "2024-02-02T00:00:00",
  "fechaFin": "2024-02-02T00:00:00",
  "fechaRegistro": "2024-02-24T00:00:00",
  "fechaModificacion": "2024-03-07T18:06:21.2497277",
  "usuarioRegistro": "0+gFQXmiMKyVsO+Gnmx1RA==",
  "usuarioModificacion": "",
  "bloqueado": 0,
  "descBloqueado": "Activo",
  "messages": "",
  "isSuccess": false
}];
const ELEMENT_DATA_ROLES: Roles[] = [];
const ELEMENT_DATA_REG: Regionales[] = [];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.displayedColumns).toEqual(['accions', 'cedula', 'nombre', 'correoElectronico', 'telefono', 'descRol', 'idRol', 'usuario', 'regCodigo', 'estado', 'fechaIni', 'fechaFin', 'usuarioRegistro', 'fechaRegistro', 'usuarioModificacion', 'fechaModificacion']);
    expect(component.users).toEqual(ELEMENT_DATA_USER);
    expect(component.dataSource).toBeTruthy();
    expect(component.dataStatic).toEqual(ELEMENT_DATA_USER);
    expect(component.roles).toEqual(ELEMENT_DATA_ROLES);
    expect(component.regs).toEqual(ELEMENT_DATA_REG);
    expect(component.accion).toEqual('');
    expect(component.tipoUsuarios).toEqual([{ id: 1, tipo: 'Planta' }, { id: 2, tipo: 'Misional' }, { id: 3, tipo: 'Contratista' }]);
    expect(component.tipoUsuariosStatic).toEqual([{ id: 1, tipo: 'Planta' }, { id: 2, tipo: 'Misional' }, { id: 3, tipo: 'Contratista' }]);
    expect(component.isLoader).toBeFalsy();
    // Resto de las expectativas de inicialización
  });

  // Prueba para el método onPageChange
  it('should update dataSource when onPageChange is called', () => {
    // Definir datos de ejemplo
    const event = { pageIndex: 1, pageSize: 5 };
    const newData = [{
      "idusuario": 3,
      "nombre": "bBHooeEsjE4EfRYI8oqsWxXwpOoMrtAAdhavSXRxCT0=",
      "usuario": "0+gFQXmiMKyVsO+Gnmx1RA==",
      "cedula": "d5FYmMzlxRVeFX6cM6/6YQ==",
      "correoElectronico": "qLFm8lZNVCUbWL5AnNM+adLn/Qyq0Me0T4ejmIsLqM8=",
      "estado": 1,
      "descEstado": "Activo",
      "idRol": 1,
      "descRol": "Super Administrador",
      "tipoUsu": 3,
      "regCodigo": 1,
      "descRegional": "Cúcuta",
      "telefono": "6OlQgbs5O1X59eHqaD1ong==",
      "contrasena": "",
      "fechaIni": "2024-02-02T00:00:00",
      "fechaFin": "2024-02-02T00:00:00",
      "fechaRegistro": "2024-02-24T00:00:00",
      "fechaModificacion": "2024-03-07T18:06:21.2497277",
      "usuarioRegistro": "0+gFQXmiMKyVsO+Gnmx1RA==",
      "usuarioModificacion": "",
      "bloqueado": 0,
      "descBloqueado": "Activo",
      "messages": "",
      "isSuccess": false
    }];

    // Espiar el método slice del array users
    spyOn(component.users, 'slice').and.returnValue(newData);

    // Llamar al método onPageChange
    component.onPageChange(event);

    // Comprobar que el dataSource se actualizó correctamente
    expect(component.dataSource.data).toEqual(newData);
  });
});
