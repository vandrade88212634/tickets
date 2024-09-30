import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AesService } from '../../services/aes/aes.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../shared/modal/modal.service';
import { AuthCacheService } from '../../services/chache/auth/authCache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, RouterModule],
})

export class LoginComponent {
  @ViewChild('errorPassword', { static: true })
  errorPasswordLoginTemplate!: TemplateRef<any>;
  @ViewChild('errorPassword2', { static: true })
  errorPasswordLoginTemplate2!: TemplateRef<any>;
  @ViewChild('errorPassword3', { static: true })
  errorPasswordLoginTemplate3!: TemplateRef<any>;
  @ViewChild('errorPassword4', { static: true })
  errorPasswordLoginTemplate4!: TemplateRef<any>;
  passwordVisible: boolean = false;
  intents: number = 0;
  document: string = '';
  messageErrorPass: string = '';
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remind: new FormControl(false)
  });

  constructor(private aesService: AesService, private authService: AuthService, private route: Router, private modalService: ModalService, private AuthCaheSrv: AuthCacheService) {
    if (typeof localStorage !== 'undefined') {
      // Usa localStorage aquí
      const recordarmeData = JSON.parse(localStorage.getItem('recordarmeData')!);
      if (recordarmeData) {
        this.loginForm.get('user')!.setValue(recordarmeData.usuario);
        this.loginForm.get('password')!.setValue(recordarmeData.contraseña);
      }
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }


  onSubmit() {


    if (this.loginForm.get('remind')!.value) {
      const recordarmeData = { usuario: this.loginForm.get('user')!.value, contraseña: this.loginForm.get('password')!.value };
      localStorage.setItem('recordarmeData', JSON.stringify(recordarmeData));
    } else {
      localStorage.removeItem('recordarmeData');
    }
    const pass = this.aesService.encryptData(this.loginForm.get('password')!.value!);
    const user = this.aesService.encryptData(this.loginForm.get('user')!.value!);

    this.authService
      .login(user, pass)
      .subscribe({
        next: (data: any) => {
          //this.isLoading = false;
      
          if (data.messages == "Proceso realizado exitosamente.") {
            const recordarmeData = { usuario: this.loginForm.get('user')!.value, contraseña: this.loginForm.get('password')!.value,idusuario : data.result.idUser,idRol : data.result.idRol};
       
            localStorage.setItem('recordarmeData', JSON.stringify(recordarmeData));

            this.route.navigate(['/dashboard/soporte']);
          } else if (data.messages == "El usuario no esta activo") {
            this.route.navigate(['/login-first', data.result.cedula]);
          }
          else if (data.messages == "Usuario no existe") {
            const customTemplate: TemplateRef<any> = this.errorPasswordLoginTemplate4;
            this.modalService.openModal(customTemplate, 'small', data.messages, 'error',);
          }
          else if (data.messages == "Has excedido el número de intentos") {
            const customTemplate: TemplateRef<any> = this.errorPasswordLoginTemplate3;
            this.modalService.openModal(customTemplate, 'small', data.messages, 'error',);
          }
          else if (data.messages == "Contraseña incorrecta") {
            this.intents++;
            this.document = data.result.cedula;
            this.openModal();
          }
        },
        error: (error) => {
          //this.isLoading = false;
          console.error('Error en la autenticación:', error);
          // Puedes manejar el error de otra manera, por ejemplo, mostrar un mensaje al usuario.
          //this.showMsg('ha ocurrido un error inesperado, por favor intente nuevamente. ', 'error', 'error');
        },
      });
    this.closemodal();
  }

  blockUser() {
    this.authService.InactivateUser(this.document).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error en la autenticación:', error);
      },
    });
  }

  openModal(): void {
    if (this.intents === 1) {
      const customTemplate: TemplateRef<any> = this.errorPasswordLoginTemplate;
      this.modalService.openModal(customTemplate, 'small', 'Error', 'error',);
    }
    if (this.intents === 2) {
      const customTemplate: TemplateRef<any> = this.errorPasswordLoginTemplate2;
      this.modalService.openModal(customTemplate, 'small', 'Error', 'error',);
    }
    if (this.intents === 3) {
      this.blockUser();
      const customTemplate: TemplateRef<any> = this.errorPasswordLoginTemplate3;
      this.modalService.openModal(customTemplate, 'medium', 'Has excedido el número de intentos', 'error',);
    }
    this.closemodal();
  }

  closemodal(): void {
    setTimeout(() => {
      this.modalService.closeModal();// Cierra todos los modales abiertos
    }, 2000);
  }

}

