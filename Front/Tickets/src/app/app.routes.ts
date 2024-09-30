import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { LoginFirstComponent } from './auth/login-first/login-first.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { RolesComponent } from './dashboard-admin/pages/roles/roles.component';
import { UsersComponent } from './dashboard-admin/pages/users/users.component';
import { SoporteComponent} from './dashboard-admin/pages/soporte/soporte.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'login-first/:id',
        component: LoginFirstComponent
    },
    {
        path: 'restablecer-contrasena',
        component: RestorePasswordComponent,
    },
    {
        path: 'admin',
        component: DashboardAdminComponent,
        //canActivate: [authGuard],
        children: [
            {
                path: 'roles',
                component: RolesComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            },
           
        ]
    },
    {
        path: 'dashboard',
        component: DashboardAdminComponent,
        //canActivate: [authGuard],
        children: [
            {
                path: 'soporte',
               component: SoporteComponent,
            },
           
        ]
    }
];
