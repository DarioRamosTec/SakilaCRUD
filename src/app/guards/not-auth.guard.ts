import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export const notAuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.user()) {
    return router.createUrlTree(['/auth'])
  } else {
    if (localStorage.getItem(environment.storageNames.token)) {
      let observable = new Observable<GuardResult>((subscriber) => {
        authService.me().subscribe({
          next(value) {
            authService.user.update(data => {
              return value.data
            })
            subscriber.next(router.createUrlTree(['/auth']))
          },
          error(err) {
            localStorage.removeItem(environment.storageNames.token);
            subscriber.next(true)
          },
        })
      })
      return observable
    } else {
      return true
    }
  }
};
