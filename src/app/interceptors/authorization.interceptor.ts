import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.development';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(environment.storageNames.token);
  if (token) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }
  return next(req);
};
