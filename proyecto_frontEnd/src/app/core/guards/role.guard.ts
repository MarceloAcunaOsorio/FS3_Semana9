import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class roleGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}
  
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const expectedRoles = route.data['roles'] || []; // Garantiza que sea un array vacío si está indefinido
    const userRole = this.authService.getUserRole() || ''; // Garantiza que sea un string vacío si está indefinido
  
    console.log('Expected Roles:', expectedRoles);
    console.log('User Role:', userRole);

    if (Array.isArray(expectedRoles) && expectedRoles.includes(userRole)) {
      return true; // El usuario tiene el rol adecuado
    }
  
    // Redirigir si no tiene el rol adecuado
    this.router.navigate(['/home']);
    return false;
  }
  
};
