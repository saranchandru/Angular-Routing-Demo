import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from './login/login.service';
import { UserRole } from './utilities/user/user-role.enum';

export const appRoutesGuard = (route: ActivatedRouteSnapshot): boolean | UrlTree => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const requiredRole: UserRole[] = route.data['roles'];
  let pathToNavigate: string = '';
  if (loginService.isLoggedIn()) {
    if ((!requiredRole || requiredRole.includes(loginService.getCurrentUserRole()))) {
      return true;
    } else {
      pathToNavigate = '/restriction';
    }
  } else {
    pathToNavigate = '/login';
  }

  router.navigateByUrl(pathToNavigate);
  return false;
  // return true;
}
