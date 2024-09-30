import { Component, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { AesService } from '../../../services/aes/aes.service';
import { MatIconModule } from '@angular/material/icon';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalService } from '../../../shared/modal/modal.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormGroup, FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RolesService } from '../../../services/roles/roles.service';
import { responseHttp, responseRoles, responseRolesResult, showtabletRoles } from '../../../core/models/admin.model';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TextFieldModule } from '@angular/cdk/text-field';


export interface perm {
  [x: string]: any;
  descripcion: string,
  estado: number,
  idAccesos: number | 0,
  selected?: boolean
   permisos?: any;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatPaginatorModule, MatTableModule, MatSortModule, MatIconModule, MatSelectModule, MatButtonModule, FormsModule, MatFormFieldModule, MatDividerModule, MatInputModule, MatDatepickerModule, MatProgressBarModule, TextFieldModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
  providers: []
})
export class RolesComponent implements OnInit {

  @ViewChild('edit', { static: true })
  editTemplate!: TemplateRef<any>;

  @ViewChild('view', { static: true })
  viewTemplate!: TemplateRef<any>;

  @ViewChild('delete', { static: true })
  deleteTemplate!: TemplateRef<any>;

  @ViewChild('activate', { static: true })
  activateAccessoTemplate!: TemplateRef<any>;

  @ViewChild('asignarAccesso', { static: true })
  asignarAccessoTemplate!: TemplateRef<any>;

  @ViewChild('messagess', { static: true })
  messagessTemplate!: TemplateRef<any>;

  @ViewChild('modalSinBtn', { static: true })
  modalSinBtnTemplate!: TemplateRef<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('accions', { static: true })
  accionsTemplate!: TemplateRef<any>;

  data: showtabletRoles[] = []; // Tu array de usuarios
  dataSource: MatTableDataSource<showtabletRoles>; // Instancia de MatTableDataSource
  rolById: responseRolesResult | undefined;
  permissionsAll: perm[] = [];

  dataModulesAll: perm[] = [];
  dataModulesRol: perm[] = [];
  allModules: showtabletRoles[] = [
    {
     
      descripcion: 'Modulo 1',
    
     
      idRol: '1'
    },
    {
      
      descripcion: 'Modulo 1',
      
     
      idRol: '1'
    },
    {
      
      descripcion: 'Modulo 1',
      
      idRol: '1'
    }
  ];

  searchTerm = '';
  moduloSelect: perm = {
    descripcion: '',
    estado: 0,
    idAccesos: 0
  };

  dataStatic: showtabletRoles[] = [];

  messagges = {
    title: '',
    contend: ''
  }

  action = '';

  displayedColumns2: string[] = ['descripcion'];

  resultsLength = 0;
  displayedColumns: string[] = ['accions', 'rol', 'descripcion'];

  rolForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), this.noSpecialCharsValidator()]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200), this.noSpecialCharsValidator()]),
    id: new FormControl('', [Validators.required])
  });
  
  isLoadingResults=true;

  
  elementSelet: responseRolesResult = {
    idRol: 0,
    descripcion: '',
    messages: '',
    isSuccess: false,
    idAcceso: 0,
    idAccesos: 0,
    name: '',
    id: 0,
    modulos: undefined
  };
 
  ngOnInit(): void {
    
    this.dataRol();
    this.getAllPermissions();
    
    
      
    
  } 
  constructor(
    private rolesSvc: RolesService,
    private aes: AesService,
    private modalService: ModalService
   
  ) {
    this.dataSource = new MatTableDataSource<showtabletRoles>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  decodeAES(ciphertext: string): string {
    return this.aes.decryptData(ciphertext);
  }

  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[0-9]/.test(control.value);
      return forbidden ? { 'noNumbers': { value: control.value } } : null;
    };
  }

  noSpecialCharsValidator() {
    return (control: { value: string; }) => {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,:()'=]+$/; 
      const isValid = regex.test(control.value);
  
      return isValid ? null : { invalidChars: true };
    };
  }

  modalAccions(element: responseRolesResult) {
    this.elementSelet = element;
    const customTemplate: TemplateRef<any> = this.accionsTemplate;
    this.modalService.openModal(customTemplate, 'medium', '', null);
  }

  openModal(): void {
    this.rolById = undefined;
    this.dataModulesRol = [];
    this.action = 'create';
    this.rolForm.patchValue({id:'0'})
    this.addModuleDefault();
    const customTemplate: TemplateRef<any> = this.editTemplate;
    this.modalService.openModal(customTemplate, 'medium', 'Crear Rol', 'security',);
  }

  onSubmit() {

  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const newData = this.data.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<showtabletRoles>(newData);
  }

  closemodal(): void {
    this.modalService.closeModal();
  }

  abrirDialoAddAccesso() {

  }

  dataRol() {
    this.isLoadingResults = false;
    this.rolesSvc.getRoles().subscribe((data: responseRoles) => {
      if (data.result) {
        this.isLoadingResults = true;
        this.data = data.result.map((element: any) => {
          return {
           
            descripcion: element.descripcion.trim(),
            idRol: element.idRol,
           
           
          };
        });
        
        
        this.updateDataSource();
    
        this.dataStatic = this.data;
      }
    });
  }

  dataRolbyId(id: number) {

    this.rolesSvc.getRolbyId(id).subscribe((data: any) => {
      if (data.result) {
        this.rolById = data.result;
        if (data.result.modulos.length >= 1) {
        
          this.dataModulesRol = data.result.modulos;
        } else {

          this.addModuleDefault();

        }

      }
    });
  }

  addModuleDefault() {
    let datos: any = this.dataModulesAll.map(element => {
      return {
        descripcion: element.descripcion,
        idOpciones: element.idAccesos,
        isSuccess: true,
        seleted: false
      }
    });
    this.dataModulesRol = datos;
    console.log('addModuleDefault', this.dataModulesRol);

    this.dataModulesRol.forEach(permission => {
      permission.permisos = this.permissionsAll.map(element => {
        return {
          idAccesos: element.idAccesos,
          descripcion: element.descripcion,
          activo: 0
        }
      }); // Cambia 'valor' por el valor que desees asignar
    });

    console.log(this.dataModulesRol);
  }

  asignarPermisos() {
    const index = this.dataModulesRol.findIndex(module => module.descripcion === this.moduloSelect.descripcion);

    if (index !== -1) {
      for (let i = 0; i < this.dataModulesRol[index].permisos.length; i++) {
        for (let j = 0; j < this.permissionsAll.length; j++) {
          const permiso = this.dataModulesRol[index].permisos[i];
          const permisoAll = this.permissionsAll[j];
          if (permiso.idAccesos === permisoAll.idAccesos && permisoAll.selected) {
            this.dataModulesRol[index].permisos[i].activo = 1;
          } else if (permiso.idAccesos === permisoAll.idAccesos && !permisoAll.selected) {
            this.dataModulesRol[index].permisos[i].activo = 0;
          }
        }
      }
    }
    this.modalService.closeModalUnit();
    console.log(this.dataModulesRol);
  }

  getAllPermissions() {
    this.rolesSvc.getPermissions().subscribe((data: any) => {
      if (data.result) {
        console.log(data.result);
        this.permissionsAll = data.result;
      }
    });
  }

  registerRol() {
    const dataForm = {
      "idRol": 0,
      "descripcion": this.rolForm.value.description,
      "nombre": this.rolForm.value.name,
      "estado": 0,
      "descEstado": "string",
      "fechaRegistro": new Date(),
      "fechaModificacion": new Date(),
      "usuarioRegistro": "string",
      "usuarioModificacion": "string",
      "messages": "string",
      "isSuccess": true,
      "modulos": this.dataModulesRol
    };

    this.rolesSvc
      .registerRol(dataForm)
      .subscribe((data: responseRolesResult) => {
        console.log(data);
        if (data.isSuccess) {
          this.dataRol();
          this.messagges.title = '¡Éxito!';
          this.messagges.contend = 'El rol se ha agregado correctamente.';
          this.modalService.openModal(this.modalSinBtnTemplate, 'medium', '', 'succes',);
          this.confirmClosemodal();
        } else {
          this.dataRol();
          this.messagges.contend = data.messages ? data.messages?.toString() : 'Error';
          this.modalService.openModal(this.modalSinBtnTemplate, 'medium', 'error', 'error',);
          this.confirmClosemodal();
        }
        //this.closeDialog();
      });
  }

  editRol() {
    const dataForm = {
      "idRol": this.rolForm.value.id,
      "descripcion": this.rolForm.value.description,
      "nombre": this.rolForm.value.name,
      "estado": 0,
      "descEstado": "string",
      "fechaRegistro": new Date(),
      "fechaModificacion": new Date(),
      "usuarioRegistro": "string",
      "usuarioModificacion": "string",
      "messages": "string",
      "isSuccess": true,
      "modulos": this.dataModulesRol
    };

    this.rolesSvc.editRol(dataForm).subscribe((data: responseRoles) => {

      if (data.isSuccess) {
        this.messagges.title = '¡Éxito!' ;
        this.messagges.contend = 'El rol se ha modificado correctamente.';
        this.modalService.openModal(this.modalSinBtnTemplate, 'medium', '', 'succes',);
      } else {
        this.messagges.contend = data.messages ? data.messages?.toString() : 'Error';
        this.modalService.openModal(this.modalSinBtnTemplate, 'medium', 'error', 'error',);
      }   
      this.confirmClosemodal();
      this.dataRol();
    });
  }

  GetAllModules() {
    this.rolesSvc.GetAllModulos().subscribe((data: responseHttp) => {
      if (data.result) {

        this.dataModulesAll = data.result.map((element) => {
          return {
            descripcion: element.descripcion.trim(),
            id: element.idOpciones,
            estado: 1,
            idAccesos: element.idOpciones,
            selected: true
          };
        });

        // Asigna la primera opción por defecto si hay elementos en dataModulesAll
        if (this.dataModulesAll.length > 0) {
          this.moduloSelect = this.dataModulesAll[0];
          console.log( this.moduloSelect );
        }
      }
    });
  }

  addModule() {
    this.modalService.openModal(this.asignarAccessoTemplate, 'small', '', 'security',);
    this.combinarPermisos();
  }

  combinarPermisos() {

    const moduloSeleccionado = this.dataModulesRol.find(modulo => modulo['idOpciones'] === this.moduloSelect.idAccesos);
    const permisosRol = moduloSeleccionado?.permisos;

    this.permissionsAll.forEach((permission, index) => {
      const correspondingPermission = permisosRol.find((p: { idAccesos: number; activo: number; }) => p.idAccesos === permission.idAccesos && p.activo == 1);

      if (correspondingPermission) {
        this.permissionsAll[index]['selected'] = true;
      } else {
        this.permissionsAll[index]['selected'] = false;
      }
    });

  }

  editPermissionModuleId(selectedValue: number) {
    this.modalService.openModal(this.asignarAccessoTemplate, 'small', '', 'security',);
    this.moduloSelect = this.dataModulesAll[selectedValue];
    this.combinarPermisos();
  }

  deletePermissionModule(selectedValue: number) {
    console.log(this.dataModulesRol[selectedValue].permisos);
    for (let i = 0; i < this.dataModulesRol[selectedValue].permisos.length; i++) {
      this.dataModulesRol[selectedValue].permisos[i].activo = 0;
    }
  }

  deleteRol() {
    let id = this.rolById?.idRol ? this.rolById.idRol : 0;
    this.rolesSvc.deleteRoles(id).subscribe((data) => {
      if (data) {
        console.log(data);
        if (data.isSuccess) {
          this.messagges.title = '¡Éxito!'
          this.messagges.contend = 'El rol se ha eliminado correctamente.';
          this.modalService.openModal(this.modalSinBtnTemplate, 'medium', '', 'succes');
          this.confirmClosemodal();
        } else {
          this.messagges.contend = data.messages ? data.messages?.toString() : 'Error';
          this.modalService.openModal(this.modalSinBtnTemplate, 'medium', 'error', 'error');
          this.confirmClosemodal();
        }
        this.dataRol();
      } else {
        this.messagges.contend = 'Ha ocurrido un error, por favor intenta mas tarde.';
        this.modalService.openModal(this.modalSinBtnTemplate, 'medium', 'error', 'error');
        this.confirmClosemodal();
      }
    });
  }

  activateRol() {
    let status = (this.rolById?.estado == 1) ? 'InactivateRol' : 'ActivateRol';
    console.log(this.rolById);
    let id = this.rolById?.idRol ? this.rolById.idRol : 0;
    this.rolesSvc.activateRol(id, status).subscribe((data) => {
      if (data) {
        console.log(data);
        if (data.isSuccess) {
          this.messagges.title = '¡Éxito!';
          this.messagges.contend = 'El rol se ha activado correctamente.';
          this.modalService.openModal(this.modalSinBtnTemplate, 'medium', '', 'succes');
          this.confirmClosemodal();
        } else {
          this.messagges.contend = data.messages ? data.messages?.toString() : 'Error';
          this.modalService.openModal(this.modalSinBtnTemplate, 'medium', 'Error', 'error');
          this.confirmClosemodal();
        }
        this.dataRol();
      } else {
        this.messagges.title = 'Rol';
        this.messagges.contend = 'Ha ocurrido un error, por favor intenta mas tarde.';
        this.modalService.openModal(this.modalSinBtnTemplate, 'medium', 'error', 'error');
        this.confirmClosemodal();
      }
    });
  }

  clickView(rolbyId: responseRolesResult) {
    this.dataModulesRol = [];
    this.dataRolbyId(rolbyId?.idRol);
    this.modalService.openModal(this.viewTemplate, 'medium', '', null,);
    this.rolById = rolbyId;
  }

  clickAddEdit(rolbyId: responseRolesResult) {
    console.log(rolbyId);
    this.dataModulesRol = [];
    this.action = 'edit';
    this.dataRolbyId(rolbyId?.idRol);
    let idRol = rolbyId?.idRol.toString();
    this.modalService.openModal(this.editTemplate, 'medium', '', null,);
    this.rolForm.patchValue({
      name: rolbyId?.name,
      description: rolbyId?.descripcion,
      id: idRol,
    })
  }

  submit() {
    if (this.rolForm.valid) {
      if (this.action == 'create') {
        this.registerRol();
      } else if (this.action == 'edit') {
        this.editRol();
      }
    } else {
      
    }
    
  }


  clickBlockUnblock(rolbyId: responseRolesResult) {
    this.dataRolbyId(rolbyId?.idRol);
    let title='';
    this.rolById = rolbyId;
    if (rolbyId?.estado == 0) {
      this.action = 'activar';
      title ='¿Está seguro de que desea Activar este rol?';
    } else {
      this.action = 'desactivar';
      title ='¿Está seguro de que desea Desactivar este rol?';
    }
    this.modalService.openModal(this.activateAccessoTemplate, 'medium', title, 'answer',);
  }

  clickDelete(rolbyId: responseRolesResult) {
    this.dataRolbyId(rolbyId?.idRol);
    this.modalService.openModal(this.deleteTemplate, 'medium', '¿Está seguro de que desea eliminar el rol?', 'answer');
  }

  onCheckboxChange(
    event: MatCheckboxChange,
    permisions: perm
  ): void {
    const indexEncontrado = this.permissionsAll.findIndex(
      (item) => item.idAccesos === permisions.idAccesos
    );

    console.log(indexEncontrado, event.checked);

    if (event.checked) {
      this.permissionsAll[indexEncontrado].selected = true;
    } else {
      this.permissionsAll[indexEncontrado].selected = false;
    }

    console.log(this.permissionsAll);
  }

  onSelectChange(selectedValue: perm) {
    this.moduloSelect = selectedValue;
    this.combinarPermisos();
  }

  onSearch() {
    console.log(this.searchTerm);
    this.data = this.dataStatic.filter((item) =>
      
      item.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateDataSource();
  }

  clearSearch() {
    this.searchTerm = '';
    this.data = this.dataStatic.filter((item) =>
      item.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateDataSource();
    
  }

  updateDataSource(){
    this.dataSource = new MatTableDataSource<showtabletRoles>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.resultsLength = this.data.length;
  }

  closeOneModal() {
    this.modalService.closeModalUnit();
  }

  confirmClosemodal(): void {
    setTimeout(() => {
      this.modalService.closeModal();
    }, 2000);;
  }

  mesajeCancelar(): void {
    this.messagges.title = '';
    this.messagges.contend = 'Si acepta, el registro no se creará ni guardará.';
    this.modalService.openModal(this.messagessTemplate, 'medium', '¿Está seguro de que desea cancelar?', 'info',);
  }
  
}
