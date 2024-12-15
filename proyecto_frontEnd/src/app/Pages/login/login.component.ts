import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
              ReactiveFormsModule,
              RouterModule,
              CommonModule,
              HeaderComponent,
              ButtonModule,
              FooterComponent,
              ToastModule,
              InputTextModule,
              HeaderComponent,
              FooterComponent,
              FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  email: string = '';
  password: string = '';


  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Recuperar el rol del usuario tras el inicio de sesión
        const roles = this.authService.getUserRole();

        console.log("rol:", roles);

        // Verificar el rol y redirigir
        if (Array.isArray(roles) && roles.includes('ADMIN')) {
          this.router.navigate(['/admin-dashboard']);
        } else if (Array.isArray(roles) && roles.includes('USER')) {
          this.router.navigate(['/user-dashboard']);
        } else {
          console.warn('Rol no reconocido o array vacío, redirigiendo a la página de inicio');
          this.router.navigate(['/home']); // Redirección por defecto
        }
      },
      error: (err) => {
        // Si ocurre un error (usuario no encontrado, credenciales incorrectas, etc.)
        if (err.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Usuario no encontrado. Por favor, regístrate primero.',
          });
          return;
        }
        else if (err.status === 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Usuario no encontrado. Por favor, regístrate primero.',
          });
          return;
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al iniciar sesión. Intenta nuevamente.',
          });
          return;
        }
      }
    });
  }
}
