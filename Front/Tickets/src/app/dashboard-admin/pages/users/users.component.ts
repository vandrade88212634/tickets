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
import { Roles} from '../../../core/models/parameters';
import { AesService } from '../../../services/aes/aes.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RolesService } from '../../../services/roles/roles.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

const ELEMENT_DATA_USER: User[] = [];
const ELEMENT_DATA_ROLES: Roles[] = [];

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Establece el idioma en español
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }], // Opcional: configura otras opciones del adaptador de fecha y hora],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatIconModule, MatSelectModule, MatButtonModule, MatFormFieldModule, MatDividerModule, MatInputModule, MatDatepickerModule, MatMomentDateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['accions', 'cedula', 'nombre',  'usuario'];
  users = ELEMENT_DATA_USER; // Tu array de usuarios
  dataSource: MatTableDataSource<User>; // Instancia de MatTableDataSource
  dataStatic = ELEMENT_DATA_USER;
  roles = ELEMENT_DATA_ROLES;
  
  accion = '';
  opcional: boolean = true;

  isLoader = false;
  // Datos Usuario //
  cedula: string = '';
  tipoUsu: any = '';
  nombre: string = '';
  fechaIni: any = '';
  correoElectronico: string = '';
  telefono: string = '';
  regCodigo: any = '';
  idRol: any = '';
  usuario: string = '';
  bloqueado: number = 0;
  descBloqueado: string = '';
  contrasena: string = '';
  descEstado: string = '';
  descRegional: string = '';
  descRol: string = '';
  estado: number = 0;
  fechaFin: string = '';
  fechaModificacion: string | null = null;
  fechaRegistro: string | null = null;
  idusuario: number = 0;
  isSuccess: boolean = false;
  usuarioModificacion: string | null = '';
  usuarioRegistro: string | null = '';
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

  addEditForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    cedula: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,12}$/), Validators.maxLength(12)]),
   
    idRol: new FormControl('', [Validators.required]),
   
   
    usuario: new FormControl('', [Validators.required]),
  });


  constructor(private modalService: ModalService, private rolService: RolesService, private userService: UserService,  private aes: AesService) {
    // Crear una instancia de MatTableDataSource con tu array de usuarios y paginator
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Observa cambios en el campo tipoUsu
   
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRolesActivos();
    console.log(this.users);
  }

 

   

  decodeAES(ciphertext: string): string {
    return this.aes.decryptData(ciphertext);
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const newData = this.users.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<User>(newData);
  }

  getAllUsers() 
  {
    this.userService.GetAllUser().subscribe({
      next: (data: any) => {
        this.dataSource = data.result;
        this.users = data.result;
        this.dataStatic = data.result;
        this.resultsLength = data.result.length;
        this.isLoader = true;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

 

  getUserById(idUsuario: number) {
    this.userService.GetUserById(idUsuario).subscribe({
      next: (data: any) => {
       
        this.idusuario = data.result.idusuario;
        this.cedula = data.result.cedula;
        this.addEditForm.get('cedula')!.setValue(data.result.cedula);
        this.nombre = this.decodeAES(data.result.nombre);
        this.addEditForm.get('nombre')!.setValue(this.decodeAES(data.result.nombre));
        
        this.idRol = data.result.idRol;
        this.addEditForm.get('idRol')!.setValue(data.result.idRol);
        this.descRol = data.result.descRol;
       
        this.usuario = this.decodeAES(data.result.usuario);
        this.addEditForm.get('usuario')!.setValue(this.decodeAES(data.result.usuario));
        
        this.contrasena = data.result.contraseña=null?'':this.decodeAES(data.result.contraseña);
       
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  getAllRolesActivos() {
    this.rolService.GetAllRolesActivos().subscribe({
      next: (data: any) => {
        this.roles = data.result;
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
        this.decodeAES(item.cedula).toLowerCase().includes(filterValue.toLowerCase()) ||
        this.decodeAES(item.nombre).toLowerCase().includes(filterValue.toLowerCase()) ||
      
        item.descRol.toLowerCase().includes(filterValue.toLowerCase()) ||
        this.decodeAES(item.usuario).toLowerCase().includes(filterValue.toLowerCase()) 
       
       
        
    );
    this.updateDataSource();
  }

  updateDataSource() {
    this.dataSource = new MatTableDataSource<User>(this.users);
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

  modalAccions(idUsuario: number, bloqueado: number, cedula: string) {
    this.idusuario = idUsuario;
    this.bloqueado = bloqueado;
    this.cedula = cedula;
    const customTemplate: TemplateRef<any> = this.accionsTemplate;
    this.modalService.openModal(customTemplate, 'medium', '', null);
  }

  clickAddEdit(accion: string, idUsuario: number = 0): void {
    this.addEditForm.reset();
    this.accion = accion;
   
    this.contrasena = '';
    
    
    this.descRol = '';
    
    this.idusuario = 0;
    this.isSuccess = false;
    
    if (accion === 'edit') {
      this.getUserById(idUsuario);
      this.textAddEdit = 'Editar usuario';
    } else {
      this.textAddEdit = 'Crear nuevo usuario';
    }
    const customTemplate: TemplateRef<any> = this.addTemplate;
    setTimeout(() => {
      this.modalService.openModal(customTemplate, 'large', '', null);
    }, 500);
  }

  addOreditusuario() {
  
    let message = 'Editar Usuario';
    if (this.accion === 'add') message = 'Crear Usuario';
    const data = {
      idusuario: this.idusuario,
      nombre: this.aes.encryptData(this.addEditForm.get('nombre')!.value!),
      usuario: this.aes.encryptData(this.addEditForm.get('usuario')!.value!),
      cedula: this.addEditForm.get('cedula')!.value,
         idRol: this.addEditForm.get('idRol')!.value!,
            descRol: this.descRol,
      
      contraseña: this.contrasena,
    
      messages: message,
      isSuccess: this.isSuccess
    }

    if (this.accion === 'add') {
    
      this.userService.Insertusuario(data).subscribe({
        next: (data: any) => {
          console.log(data.result);
          if (data.result.isSuccess) {
            const customTemplate: TemplateRef<any> = this.addBtnTemplate;
            this.modalService.openModal(customTemplate, 'small', 'Usuario creado con éxito!', 'succes',);
            this.getAllUsers();
          } else {
            console.log(data.result.messages);
            const customTemplate: TemplateRef<any> = this.addBtnTemplate;
            this.modalService.openModal(customTemplate, 'small', data.result.messages, 'info',);
            this.getAllUsers();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    } else {
      this.userService.Editusuario(data).subscribe({
        next: (data: any) => {
          console.log(data.result);
          if (data.result.isSuccess) {
            const customTemplate: TemplateRef<any> = this.editTemplate;
            this.modalService.openModal(customTemplate, 'small', '¡Éxito!', 'succes',);
            this.getAllUsers();
          } else {
            console.log(data.result.messages);
            this.getAllUsers();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
    this.confirmClosemodal();
  }

  clickView(idUsuario: number) {
    this.getUserById(idUsuario);
    const customTemplate: TemplateRef<any> = this.viewTemplate;
    this.modalService.openModal(customTemplate, 'large', '', null);
  }

  clickBlockUnblock(active: number, cedula: string) {
    this.cedula = cedula;
    if (active === 0) {
      this.textActivar = '¿Está seguro de que desea Inactivar este usuario?';
      this.subTextActivar = 'Una vez que el usuario sea desactivado, se le retirará el acceso al sistema.';
      const customTemplate: TemplateRef<any> = this.unblockTemplate;
      this.modalService.openModal(customTemplate, 'small', this.textActivar, 'answer',);
    } else {
      this.textActivar = '¿Está seguro de que desea Activar este usuario?';
      this.subTextActivar = 'Una vez que el usuario se active, recuperará el acceso al sistema';
      const customTemplate: TemplateRef<any> = this.blockTemplate;
      this.modalService.openModal(customTemplate, 'small', this.textActivar, 'answer',);
    }

  }

  inactivarUsuario() {
    this.userService.InactivateUser(this.cedula).subscribe({
      next: (data: any) => {
        if (data.result.isSuccess) {
          const customTemplate: TemplateRef<any> = this.editTemplate;
          this.modalService.openModal(customTemplate, 'small', '¡Éxito!', 'succes',);
          this.getAllUsers();
        } else {
          console.log(data.result.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    this.confirmClosemodal();
  }

  activarUsuario() {
    this.userService.ActivateUser(this.cedula).subscribe({
      next: (data: any) => {
        if (data.result.isSuccess) {
          const customTemplate: TemplateRef<any> = this.editTemplate;
          this.modalService.openModal(customTemplate, 'small', '¡Éxito!', 'succes',);
          this.getAllUsers();
        } else {
          console.log(data.result.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    this.confirmClosemodal();
  }

  clickAceptDelete() {
    this.userService.DeleteUser(this.idusuario).subscribe({
      next: (data: any) => {
        if (!data.result.isSuccess) {
          this.textDelete = '¡Acción invalida!';
          this.subTextDelete = 'El usuario seleccionado no se puede eliminar ya que cuenta con registros en el sistema. Para eliminar un usuario, primero asegúrate de que tenga ningún registro en el sistema.';
          const customTemplate: TemplateRef<any> = this.deleteTemplate;
          this.modalService.openModal(customTemplate, 'small', this.textDelete, 'warning',);
          this.getAllUsers();
        } else {
          this.getAllUsers();
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    this.confirmClosemodal();
  }

  clickDelete(idUsuario: number) {
    this.idusuario = idUsuario;
    const customTemplate: TemplateRef<any> = this.deleteTemplate;
    this.modalService.openModal(customTemplate, 'small', this.textDelete, 'answer');
  }
}
