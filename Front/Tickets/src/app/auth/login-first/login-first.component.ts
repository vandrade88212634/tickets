import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginFirstService } from '../../services/loginFirst/login-first.service';
import { ActivatedRoute } from '@angular/router';
import { AesService } from '../../services/aes/aes.service';
import { ModalService } from '../../shared/modal/modal.service';

import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login-first',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatError],
  templateUrl: './login-first.component.html',
  styleUrl: './login-first.component.css'
})
export class LoginFirstComponent implements OnInit {

  @ViewChild('messagess', { static: true })
  messagessTemplate!: TemplateRef<any>;

  messagges = {
    title: '',
    contend: ''
  }

  updatePasswordForm: FormGroup;

  viewPass1 = false;
  viewPass2 = false;
  viewPass3 = false;
  coincidirPassword = true;
  steep = 'sendEmail';

  cc: any;
  constructor(
    private fb: FormBuilder,
    private authService : LoginFirstService,
    private route: Router,
    private routeAct: ActivatedRoute,
    private aesSrv: AesService,
    private modalService: ModalService,
  ) {
    this.updatePasswordForm = this.fb.group({
      NowPassword: [
        '',
        [
          Validators.required
        ],
      ],
      NewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(/^(?=.*((\S*\d){1,}))(?=.*((\S*[A-Z]){1,}))(?=.*[a-z])(?=.*[\W])\S{8,}$/),
        ],
      ],
      RepetNewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(/^(?=.*((\S*\d){1,}))(?=.*((\S*[A-Z]){1,}))(?=.*[a-z])(?=.*[\W])\S{8,}$/),
        ],
      ],
    });

  
  }
  ngOnInit(): void {
    this.routeAct.paramMap.subscribe((params) => {
    this.cc= params.get('id')
      console.log(this.cc);
    })
  }

  onSubmit() {
      console.log(this.updatePasswordForm);
      let dataPssw = {
        password: this.aesSrv.encryptData(this.updatePasswordForm.value.NowPassword), 
        newPassword: this.aesSrv.encryptData(this.updatePasswordForm.value.NewPassword),
        reNewPassword: this.aesSrv.encryptData(this.updatePasswordForm.value.RepetNewPassword),
        cedula: this.cc 
      }
      console.log(dataPssw);
      this.authService
      .ChangePassword(dataPssw)
      .subscribe({
        next: (data: any) => {
          //this.isLoading = false;
          console.log('data', data)

          if (data.isSuccess) {
            this.messagges.title = 'Éxito!';
            this.messagges.contend = 'La contraseña ha sido asignada correctamente, es necesario que vuelvas a loguearte.';
            this.modalService.openModal(this.messagessTemplate, 'small', '', 'security',);
            this.route.navigate(['/login']);
          } else {
            this.messagges.title = 'Error';
            this.messagges.contend = 'Ha ocurrido un error, por favor intentalo nuevamente.';
            this.modalService.openModal(this.messagessTemplate, 'small', '', 'error',);
          }
        },
        error: (error) => {
          //this.isLoading = false;
          console.error('Error en la autenticación:', error);
          // Puedes manejar el error de otra manera, por ejemplo, mostrar un mensaje al usuario.
          //this.showMsg('ha ocurrido un error inesperado, por favor intente nuevamente. ', 'error', 'error');
        },
      });
  }

  enviarEmail(){
    this.steep = 'changePass';
  }

  changeViewPassword(itemSelect:number){
    switch (itemSelect) {
      case 1:
        this.viewPass1 = this.viewPass1? false: true;
        break;
      case 2:
        this.viewPass2 = this.viewPass2? false: true;
        break;
    
      case 3:
        this.viewPass3 = this.viewPass3? false: true;
        break;
    }
    
  }

  validatePassword(){
    if (this.updatePasswordForm.value.NewPassword === this.updatePasswordForm.value.RepetNewPassword ) {
      this.coincidirPassword = true;
    } else {
      this.coincidirPassword = false;
    }
  }

  closemodal(): void {
    this.modalService.closeModal();
  }

}
