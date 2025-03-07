import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.user()) {
    return true;
  } else {
    if (localStorage.getItem(environment.storageNames.token)) {
      let observable = new Observable<GuardResult>((subscriber) => {
        authService.me().subscribe({
          next(value) {
            authService.user.update(data => {
              return value.data
            })
            subscriber.next(true)
          },
          error(err) {
            localStorage.removeItem(environment.storageNames.token);
            subscriber.next(router.createUrlTree(['/login']))
          },
        })
      })
      return observable
    } else {
      return router.createUrlTree(['/login'])
    }
  }
};
