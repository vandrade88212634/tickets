import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AesService } from '../../services/aes/aes.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let aesService: jasmine.SpyObj<AesService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const aesServiceSpy = jasmine.createSpyObj('AesService', ['encryptData']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AesService, useValue: aesServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    aesService = TestBed.inject(AesService) as jasmine.SpyObj<AesService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    component.togglePasswordVisibility(passwordInput);
    expect(passwordInput.type).toEqual('text');
    component.togglePasswordVisibility(passwordInput);
    expect(passwordInput.type).toEqual('password');
  });

  it('should submit login form', () => {
    const userData = { user: 'testuser', password: 'testpassword', remind: true };
    const encryptedPassword = 'encryptedPassword';
    authService.login.and.returnValue(of({
      isSuccess: true, messages: 'Proceso realizado exitosamente.', result: {
        token: 'sdafsdaf',
        nombre: 'Jhon',
        messages: 'ok',
        idUser: 1,
        isSuccess: true,
        validado: 1,
        activo: 1,
        desActivo: 1,
        correoElectronico: 'g@gmail.com',
        cedula: 111111
      }
    }));
    aesService.encryptData.and.returnValue(encryptedPassword);
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');

    component.loginForm.setValue(userData);
    component.loginForm.get('remind')?.setValue(true);
    component.onSubmit();

    expect(localStorage.setItem).toHaveBeenCalledWith('recordarmeData', JSON.stringify(userData));
    expect(aesService.encryptData).toHaveBeenCalledWith(userData.password);
    expect(authService.login).toHaveBeenCalledWith(userData.user, encryptedPassword);
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
