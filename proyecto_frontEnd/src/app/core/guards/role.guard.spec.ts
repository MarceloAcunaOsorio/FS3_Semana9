import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('RoleGuard', () => {
  let roleGuard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUserRole']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    roleGuard = TestBed.inject(RoleGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if the user has a required role', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: ['ADMIN'] }; // Required roles
    authServiceSpy.getUserRole.and.returnValue('ADMIN'); // User roles

    const state = {} as RouterStateSnapshot; // Router state snapshot is not used here

    const result = roleGuard.canActivate(route, state);

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block access and redirect if the user does not have a required role', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: ['ADMIN'] }; // Required roles
    authServiceSpy.getUserRole.and.returnValue('USER'); // User roles

    const state = {} as RouterStateSnapshot; // Router state snapshot is not used here

    const result = roleGuard.canActivate(route, state);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should block access and redirect if the user roles are empty', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: ['ADMIN'] }; // Required roles
    authServiceSpy.getUserRole.and.returnValue(""); // No roles

    const state = {} as RouterStateSnapshot;

    const result = roleGuard.canActivate(route, state);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should block access and redirect if userRoles is not an array', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: ['ADMIN'] }; // Required roles
    authServiceSpy.getUserRole.and.returnValue(null); // Invalid roles

    const state = {} as RouterStateSnapshot;

    const result = roleGuard.canActivate(route, state);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
