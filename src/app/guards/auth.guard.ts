import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {

    const userType = authService.isAdmin()

    if (route.data['adminOnly'] && route.data['adminOnly'] !== userType) {

      router.navigate([''])

      return true

    } else {

      return true

    }

  } else {

    router.navigate(['/login']);
    return false;
  }

};
