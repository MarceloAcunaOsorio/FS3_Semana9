import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userLoginOn:boolean=false;
  tokenExists: boolean = false;

  ngOnInit():void
  { 
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('authToken');
      this.tokenExists = !!token;  // true if token exists, false otherwise
    }
  
  }

  constructor(private readonly authService: AuthService, private readonly router: Router){}
 
  logout(): void{
    this.authService.logout();
  }


  redirectToDashboard(): void {
    const roles = this.authService.getUserRole(); // Obtén los roles del usuario
  
    if (Array.isArray(roles) && roles.includes('ADMIN')) {
      this.router.navigate(['/admin-dashboard']);
    } else if (Array.isArray(roles) && roles.includes('USER')) {
      this.router.navigate(['/user-dashboard']);
    } else {
      console.warn('Rol no reconocido o array vacío, redirigiendo a la página de inicio');
      this.router.navigate(['/home']); // Redirección por defecto
    }
  }

}
