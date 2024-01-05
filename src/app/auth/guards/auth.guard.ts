import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};

export const canMatchGuard: CanMatchFn = (
  //'Tipado' CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
};

export const canActivateGuard: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return checkAuthStatus();
};

// import { Injectable, inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { Observable, tap } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   checkAuthStatus(): Observable<boolean> | boolean {
//     return this.authService.checkAuthentication().pipe(
//       tap((isAuthenticated) => {
//         if (!isAuthenticated) {
//           return this.router.navigate(['/auth/login']);
//         }
//         return;
//       })
//     );
//   }
// }
