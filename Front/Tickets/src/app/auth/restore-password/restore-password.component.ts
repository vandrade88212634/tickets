import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatInputModule } from '@angular/material/input';
import { LoginFirstService } from '../../services/loginFirst/login-first.service';
import { AesService } from '../../services/aes/aes.service';
import { ModalService } from '../../shared/modal/modal.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatInputModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatError, MatButtonModule],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.css'
})
export class RestorePasswordComponent {

  updatePasswordForm: FormGroup;
  preregisterForm: FormGroup;

  @ViewChild('messagess', { static: true })
  messagessTemplate!: TemplateRef<any>;

  messagges = {
    title: '',
    contend: ''
  }

  viewPass1 = false;
  viewPass2 = false;
  viewPass3 = false;
  coincidirPassword = true;
  steep = 'sendEmail';

  constructor(
    private fb: FormBuilder,
    private authService: LoginFirstService,
    private route: Router,
    private aesSrv: AesService,
    private modalService: ModalService
  ) {
    this.updatePasswordForm = this.fb.group({
      NewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern(/^(?=.*((\S*\d){1,}))(?=.*((\S*[A-Z]){1,}))(?=.*[a-z])(?=.*[\W])\S{8,}$/),
        ],
      ],
      RepetNewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern(/^(?=.*((\S*\d){1,}))(?=.*((\S*[A-Z]){1,}))(?=.*[a-z])(?=.*[\W])\S{8,}$/),
        ],
      ],
    });

    this.preregisterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/)]]
    });
  }

  cc = '';
  pass = '';

  onSubmit() {
    let dataPssw = {
      password: this.pass,
      newPassword: this.aesSrv.encryptData(this.updatePasswordForm.value.NewPassword),
      reNewPassword: this.aesSrv.encryptData(this.updatePasswordForm.value.RepetNewPassword),
      cedula: this.cc
    }
    console.log(this.preregisterForm);
    this.authService
      .ChangePassword(dataPssw)
      .subscribe({
        next: (data: any) => {

          if (data.isSuccess) {
            this.messagges.title = 'Restablecer contraseña';
            this.messagges.contend = 'La contraseña se ha restablecido.';
            this.modalService.openModal(this.messagessTemplate, 'medium', '', 'security',);
            this.route.navigate(['/login']);
          } else {
            this.messagges.title = 'Error';
            this.messagges.contend = data.messages;
            this.modalService.openModal(this.messagessTemplate, 'medium', '', 'error',);
          }

        },
        error: (error) => {
          this.messagges.title = 'Error';
          this.messagges.contend = error;
          this.modalService.openModal(this.messagessTemplate, 'medium', '', 'error',);
        },
      });
  }

  enviarEmail() {
    if (this.preregisterForm.valid) {
      
      let email = this.aesSrv.encryptData(this.preregisterForm.value.email);

      this.authService
        .send_email_change_password(email)
        .subscribe({
          next: (data: any) => {

            if (data.isSuccess) {
              this.messagges.title = 'Petición de restablecer contraseña enviada con éxito';
              this.messagges.contend = 'A continuación, recibirá un correo con las indicaciones que debe seguir para restablecer su contraseña';
              this.modalService.openModal(this.messagessTemplate, 'medium', '', 'succes',);
              this.route.navigate(['/login']);
              this.steep = 'changePass';
              this.cc = data.result.cedula;
              this.pass = data.result.contraseña;
              this.steep = 'changePass';
              //this.route.navigate(['/admin']);
            } else {
              this.messagges.title = 'Error';
              this.messagges.contend = data.messages;
              this.modalService.openModal(this.messagessTemplate, 'small', '', 'error',);
            }
          },
          error: (error) => {
            console.error('Error en la autenticación:', error);},
        });
      console.log(this.preregisterForm);
    }
  }

  changeViewPassword(itemSelect: number) {
    switch (itemSelect) {

      case 2:
        this.viewPass2 = this.viewPass2 ? false : true;
        break;

      case 3:
        this.viewPass3 = this.viewPass3 ? false : true;
        break;
    }

  }

  validatePassword() {
    if (this.updatePasswordForm.value.NewPassword === this.updatePasswordForm.value.RepetNewPassword) {
      this.coincidirPassword = true;
    } else {
      this.coincidirPassword = false;
    }
  }

  closemodal(): void {
    this.modalService.closeModal();
  }
}
