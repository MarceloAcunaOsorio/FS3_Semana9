import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly LOGIN_URL = 'http://localhost:8083/api/login';
  private readonly tokenKey = 'authToken';




  constructor(private readonly httpCliente: HttpClient, private readonly router: Router) { }

  //metodo inicio de sesion
  login(email: string, password: string): Observable<any> {
    return this.httpCliente.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    )
  }
  

  //agregar token al localStorage
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  //recuperar token de localStorage
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }




  //Extraer el Rol del Usuario
  getUserRole(): string | null {
    if (typeof window === 'undefined' || !localStorage) {
      console.warn('localStorage no está disponible.');
      return null;
    }
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No se encontró un token en localStorage.');
      return null;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload del token:', payload); // Depuración
      return payload.roles || null; // Asegúrate de que el campo es correcto
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }


  //validacion del token
  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  //metodo cerrar sesion
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

}
