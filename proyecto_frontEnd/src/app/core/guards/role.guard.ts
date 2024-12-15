import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class RoleGuard implements CanActivate{
  constructor(private readonly authService: AuthService, private readonly router: Router) {}
  
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles']; // Roles requeridos desde el data de la ruta
    const userRoles = this.authService.getUserRole(); // Roles del usuario

    if (Array.isArray(userRoles) && requiredRoles.some((role: any) => userRoles.includes(role))) {
      return true; // El usuario tiene al menos uno de los roles requeridos
    }

    // Si no tiene permiso, redirige a una página de error o inicio
    this.router.navigate(['/home']);
    return false;
  }
  
};
