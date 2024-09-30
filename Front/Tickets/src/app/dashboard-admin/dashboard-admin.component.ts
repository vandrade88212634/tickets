import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainuserComponent } from '../layout/mainuser/mainuser.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/users/user.service';
import {AesService} from '../services/aes/aes.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatListModule, MatIcon, RouterLink, MainuserComponent, MatButtonModule]
})
export class DashboardAdminComponent implements OnInit {
  menu: { [key: string]: any[] } = {
    'admin': [
      {
        title: "Seguridad",
        path: "modules",
        icon: "security",
        visible: true, // Control de visibilidad
        subMenu: [
          {
            title: "Roles",
            path: "/admin/roles",
            icon: "security",
            visible: false // Control de visibilidad
          },
          {
            title: "Usuarios",
            path: "/admin/users",
            icon: "group",
            visible: false // Control de visibilidad
          }
        ]
      },
      {
        title: "Soporte",
        path: "/admin/soporte1",
        icon: "settings",
        visible: true ,// Control de visibilidad
        subMenu: [
          {
            title: "Tareas",
            path: "/admin/soporte",
            icon: "security",
            visible: false // Control de visibilidad
          }],
      }
    ]
  };
  isSubMenuOpen: boolean[] = [];
  menuSelect: any[] = [];
  isMenuOpen: boolean = false;
  idusuario = 0;
  nombreUsuario = "";
  constructor(private permisosService: AuthService, private userService : UserService,private AesService: AesService) {}

  ngOnInit() {
    this.checkPermissions();
  }

  // Método para verificar permisos
  checkPermissions() {
    let idRol = 1; // Obtén el ID del rol del usuario de alguna fuente
    
    if (typeof localStorage !== 'undefined') {
      // Usa localStorage aquí
      const recordarmeData = JSON.parse(localStorage.getItem('recordarmeData')!);
      debugger;
      if (recordarmeData) {
        idRol = recordarmeData.idRol;
        this.idusuario = recordarmeData.idusuario;
        this.llamaUsuario(this.idusuario)

      }
    }
    
    

    const permisos = [
      { idPermiso: 1, menuItem: this.menu['admin'][0].subMenu[0] }, // Roles
      { idPermiso: 2, menuItem: this.menu['admin'][0].subMenu[1] }, // Usuarios
      { idPermiso: 5, menuItem: this.menu['admin'][1].subMenu[0] } // Tareas
    ];

    permisos.forEach(permiso => {
      this.permisosService.BuscaPermiso(idRol, permiso.idPermiso).subscribe(response => {
        if (response.isSuccess) {
       
          permiso.menuItem.visible = true; // Si tiene permiso, mostrar
        }
        else
        {
       
          permiso.menuItem.visible = false
        }
      });
    });
  }
  toggleSubMenu(index: number) {
    this.isSubMenuOpen[index] = !this.isSubMenuOpen[index];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getMenuButtonClass() {
    return this.isMenuOpen ? 'btn-menu btn-menu-open' : 'btn-menu';
  }

  llamaUsuario(idusuario:number)
  {
    this.userService.GetUserById(idusuario).subscribe({
      next: (data: any) => {
       this.nombreUsuario = this.decodeAes(data.result.nombre);
    
    }
  }
    );

  }

  decodeAes(comprimido: string):string
  {
    return this.AesService.decryptData(comprimido)
  }
}