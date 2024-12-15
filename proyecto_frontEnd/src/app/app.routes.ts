import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

   {
      path: 'admin-dashboard',
      loadComponent: () => import('./Pages/admin-dashboard/admin-dashboard.component'),
      canActivate: [AuthGuard,roleGuard],
      data: { roles: ['ADMIN'] } // Solo los administradores pueden acceder
   },
   {
      path: 'user-dashboard',
      loadComponent: () => import('./Pages/user-dashboard/user-dashboard.component'),
      canActivate: [AuthGuard,roleGuard],
      data: { roles: ['USER'] } // Solo los usuarios pueden acceder
   },


   {
      path: 'modal/:_IdProducto',
      loadComponent: () => import('./Pages/modal/modal.component'),
      canActivate: [AuthGuard],
   },

   {
      path: 'login',
      loadComponent: () => import('./Pages/login/login.component'),
      canActivate: [authenticatedGuard]
   },
   {
      path: 'Registrar',
      loadComponent: () => import('./Pages/registrar/registrar.component'),
      canActivate: [authenticatedGuard]
   },
   {
      path: 'home',
      loadComponent: () => import('./Pages/home/home.component')
   },
   {
      path: '**',
      redirectTo: '/home',
   }

];
