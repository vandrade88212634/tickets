import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalService } from '../../../shared/modal/modal.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/users/user.service';
import { User } from '../../../core/models/user.model';
import {responseTarea, tarea} from '../../../core/models/tarea.model';
import { SoporteService } from '../../../services/soporte/soporte.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AesService } from '../../../services/aes/aes.service';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

const ELEMENT_DATA_USER: User[] = [];
const ELEMENT_DATA_TAREA: tarea[] = [];


@Component({
  selector: 'app-soporte',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Establece el idioma en español
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }], // Opcional: configura otras opciones del adaptador de fecha y hora],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatIconModule, MatSelectModule, MatButtonModule, MatFormFieldModule, MatDividerModule, MatInputModule, MatDatepickerModule, MatMomentDateModule],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['accions', 'descripcion', 'fechaRegistro',  'fechaEntrega','nombreUsuario'];
  users = ELEMENT_DATA_USER; // Tu array de usuarios
  tareas = ELEMENT_DATA_TAREA;
  dataSource: MatTableDataSource<tarea>; // Instancia de MatTableDataSource
  dataStatic = ELEMENT_DATA_USER;
  
  estadoTarea: any[] = [{ estado: 'Pendiente' }, {  estado: 'En Proceso' }, { estado: 'Completada' }];
  accion = '';
  opcional: boolean = true;

  isLoader = false;
  // Datos Usuario //
  descripcion: string = '';
  estado: string= '';
  idTarea: number = 0;
  fechaRegistro: string | null = null;
  idusuario: number = 0;
  idusuarioYo : number = 0;
  nombreusuario: string = '';
  fechaEntrega: string | null = null;
  isSuccess: boolean = false;
 
  //--Datos Usuario--//

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('add', { static: true })
  addTemplate!: TemplateRef<any>;
  @ViewChild('addBtn', { static: true })
  addBtnTemplate!: TemplateRef<any>;
  @ViewChild('view', { static: true })
  viewTemplate!: TemplateRef<any>;
  @ViewChild('edit', { static: true })
  editTemplate!: TemplateRef<any>;
  @ViewChild('delete', { static: true })
  deleteTemplate!: TemplateRef<any>;
  @ViewChild('cancel', { static: true })
  cancelTemplate!: TemplateRef<any>;
  @ViewChild('block', { static: true })
  blockTemplate!: TemplateRef<any>;
  @ViewChild('unblock', { static: true })
  unblockTemplate!: TemplateRef<any>;
  @ViewChild('accions', { static: true })
  accionsTemplate!: TemplateRef<any>;
  searchTerm = '';
  textAddEdit: string = '';
  textDelete: string = '¿Está seguro de que desea eliminar?';
  subTextDelete: string = 'Al eliminarlo, se eliminarán permanentemente todos sus datos y perderá el acceso al sistema.';
  regActivo: boolean = false;
  textActivar: string = '';
  subTextActivar: string = '';
  editarDatos = false;
  asignar = false;

  addEditForm = new FormGroup({
    descripcion: new FormControl(''),
    estado:  new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    fechaEntrega: new FormControl(''),
    fechaRegistro: new FormControl(''),
    nombreusuario: new FormControl(''),
    idusuario:new FormControl(0),
    idTarea:new FormControl(0),
    message: new FormControl(''),
    isSuccess:new FormControl(false)
   
  });


  constructor(private modalService: ModalService,  private userService: UserService,  private aes: AesService, private SoporteService : SoporteService, private authService : AuthService) {
    // Crear una instancia de MatTableDataSource con tu array de usuarios y paginator
    this.dataSource = new MatTableDataSource<tarea>(this.tareas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Observa cambios en el campo tipoUsu
   
  }

  ngOnInit(): void {
    this.verificarPermiso();
    this.getAllUsers();

    
  }

 

   

  decodeAES(ciphertext: string): string {
    return this.aes.decryptData(ciphertext);
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const newData = this.tareas.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<tarea>(newData);
  }

  getAllTareas() 
  {
    if (this.editarDatos || this.asignar)
    {
    this.SoporteService.GetAllTarea().subscribe({
      next: (data: any) => {
       
        this.dataSource = data.result;
        this.tareas = data.result;
         this.dataStatic = data.result;
        this.resultsLength = data.result.length;
        this.isLoader = true;
       
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
    else
    {
      
      this.SoporteService.GetallTareaByUsuario(this.idusuarioYo).subscribe({
        next: (data: any) => {
         
          this.dataSource = data.result;
          this.tareas = data.result;
           this.dataStatic = data.result;
          this.resultsLength = data.result.length;
          this.isLoader = true;
        
   
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }

  getAllUsers() 
  {
    this.userService.GetAllUser().subscribe({
      next: (data: any) => {
        
        this.users = data.result;
    
       
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

 

  getTareaById(idTarea: number) {
    this.SoporteService.GetTareaById(idTarea).subscribe({
      next: (data: any) => {
       
        const formData = {
          descripcion: data.result.descripcion,
          estado: data.result.estado,
          fechaEntrega: data.result.fechaEntrega, // Asegúrate de que esté en el formato adecuado
          fechaRegistro:data.result.fechaRegistro,
          nombreusuario: data.result.nombreUsuario,
          idusuario:data.result.idusuario,
          idTarea: data.result.idTarea,
          message:'',
          isSuccess: false
        };
      
        // Asignar valores a todos los campos
        this.addEditForm.setValue(formData);
         this.descripcion= data.result.descripcion,
          this.estado= data.result.estado,
          this.fechaEntrega= data.result.fechaEntrega, // Asegúrate de que esté en el formato adecuado
          this.fechaRegistro=data.result.fechaRegistro,
          this.nombreusuario= this.decodeAES(data.result.nombreUsuario),
          this.idusuario=data.result.idusuario,
          this.idTarea= data.result.idTarea
       


      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.users = this.dataStatic.filter(
      (item: any) =>
        
        this.decodeAES(item.nombreUsuario).toLowerCase().includes(filterValue.toLowerCase()) ||
      
        item.descRol.toLowerCase().includes(filterValue.toLowerCase()) ||
        this.decodeAES(item.usuario).toLowerCase().includes(filterValue.toLowerCase()) 
       
       
        
    );
    this.updateDataSource();
  }

  updateDataSource() {
    this.dataSource = new MatTableDataSource<tarea>(this.tareas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.resultsLength = this.users.length;
  }

  closemodal(): void {
    const customTemplate: TemplateRef<any> = this.cancelTemplate;
    this.modalService.openModal(customTemplate, 'medium', '¿Está seguro de que desea cancelar?', 'info',);
  }

  confirmClosemodal(): void {
    setTimeout(() => {
      this.modalService.closeModal();// Cierra todos los modales abiertos
    }, 1000);;
  }

  modalAccions(idTarea: number) {
    this.idTarea
    const customTemplate: TemplateRef<any> = this.accionsTemplate;
    this.modalService.openModal(customTemplate, 'medium', '', null);
  }

  clickAddEdit(accion: string, idTarea: any): void {
    this.addEditForm.reset();
    this.accion = accion;
   
    this.descripcion = '';
    
    
    this.nombreusuario = '';
    
    this.idusuario = 0;
    this.isSuccess = false;
    
    if (accion === 'edit') {
     
      this.getTareaById(idTarea);
      this.textAddEdit = 'Editar tarea';
    } else {
      this.textAddEdit = 'Crear nueva tarea';
    }
    const customTemplate: TemplateRef<any> = this.addTemplate;
    setTimeout(() => {
      this.modalService.openModal(customTemplate, 'large', '', null);
    }, 500);
  }

  addOreditTarea() {
  
    let message = 'Editar Tarea';
    if (this.accion === 'add') message = 'Crear Tarea';
    const data = {
      idusuario: this.addEditForm.get('idusuario')!.value!,
      descripcion: this.addEditForm.get('descripcion')!.value!,
      fechaEntrega: this.addEditForm.get('fechaEntrega')!.value!,
      fechaRegistro: this.addEditForm.get('fechaRegistro')!.value!,
      estado: this.addEditForm.get('estado')!.value!,
      message:'',
      isSuccess: false,
      idTarea:this.addEditForm.get('idTarea')!.value!
    }


    if (this.accion === 'add') {
        data.idTarea = 0;
      this.SoporteService.Inserttarea(data).subscribe({
        next: (data: any) => {
          console.log(data.result);
          if (data.result.isSuccess)
            {
            const customTemplate: TemplateRef<any> = this.addBtnTemplate;
            this.modalService.openModal(customTemplate, 'small', 'Tarea creada con éxito!', 'succes',);
            this.getAllTareas();
          } 
          else {
            console.log(data.result.messages);
            const customTemplate: TemplateRef<any> = this.addBtnTemplate;
            this.modalService.openModal(customTemplate, 'small', data.result.messages, 'info',);
            this.getAllTareas();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    } else {
      this.SoporteService.EditTarea(data).subscribe({
        next: (data: any) => {
          console.log(data.result);
          if (data.result.isSuccess) {
            const customTemplate: TemplateRef<any> = this.editTemplate;
            this.modalService.openModal(customTemplate, 'small', '¡Éxito!', 'succes',);
            this.getAllTareas();
          } else {
            console.log(data.result.messages);
            this.getAllTareas();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
    this.confirmClosemodal();
  }

  clickView(idTarea: any) {
    this.getTareaById(idTarea);
    const customTemplate: TemplateRef<any> = this.viewTemplate;
    this.modalService.openModal(customTemplate, 'large', '', null);
  }

 
  clickAceptDelete() {
    const data = {
      idusuario: this.idusuario,
      descripcion: this.descripcion,
      fechaEntrega: this.fechaEntrega,
      fechaRegistro: this.fechaRegistro,
      estado: this.estado,
      message:'',
      isSuccess: false
    }
    this.SoporteService.DeleteTarea(data).subscribe({
      next: (data: any) => {
        if (!data.result.isSuccess) {
          this.textDelete = '¡Acción invalida!';
          this.subTextDelete = 'El usuario seleccionado no se puede eliminar ya que cuenta con registros en el sistema. Para eliminar un usuario, primero asegúrate de que tenga ningún registro en el sistema.';
          const customTemplate: TemplateRef<any> = this.deleteTemplate;
          this.modalService.openModal(customTemplate, 'small', this.textDelete, 'warning',);
          this.getAllTareas();
        } else {
          this.getAllTareas();
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    this.confirmClosemodal();
  }

  clickDelete(idTarea: number) {
    this.idTarea = idTarea;
    const customTemplate: TemplateRef<any> = this.deleteTemplate;
    this.modalService.openModal(customTemplate, 'small', this.textDelete, 'answer');
  }


  verificarPermiso(): boolean {
    let idRol = 0;
    let Permiso = false;
   
    if (typeof localStorage !== 'undefined') {
      // Usa localStorage aquí
      
      const recordarmeData = JSON.parse(localStorage.getItem('recordarmeData')!);
      if (recordarmeData) {
          idRol = recordarmeData.idRol 
          this.idusuarioYo = recordarmeData.idusuario;
      }
    }
    this.authService.BuscaPermiso(idRol, 2).subscribe(response => {
      if (response.isSuccess) {
     
        Permiso= true; // Si tiene permiso, mostrar
        this.editarDatos = true;
      }
      else
      {
        this.editarDatos = false;
        Permiso=  false;
      }
      this.authService.BuscaPermiso(idRol, 6).subscribe(response => {
        if (response.isSuccess) {
       
          Permiso= true; // Si tiene permiso, mostrar
          this.asignar = true;
        }
        else
        {
          this.asignar = false;
          Permiso=  false;
        }
        this.getAllTareas();
        
      });
    });

   
    return Permiso
  }
}
