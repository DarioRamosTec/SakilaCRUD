import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import User from '../interfaces/models/user';
import Token from '../interfaces/token';
import LoginRequest from '../interfaces/requests/login-request';
import { Observable } from 'rxjs';
import Response from '../interfaces/responses/response';
import { environment } from '../../environments/environment.development';
import SendResetPasswordRequest from '../interfaces/requests/send-reset-password';
import ResetPasswordRequest from '../interfaces/requests/reset-password';
import VerifySessionRequest from '../interfaces/requests/verify-session';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  override url: string = "auth/";
  user: WritableSignal<User | undefined> = signal(undefined)
  token: WritableSignal<Token | undefined> = signal(undefined)

  constructor(http: HttpClient) {
    super(http)
    effect(() => {
      if (this.token()) {
        localStorage.setItem(environment.storageNames.token, this.token()!.value);
      }
    })
  }

  login(data: LoginRequest) : Observable<Response<Token>> {
    return this.http.post<Response<Token>>(`${environment.apiUrl}login`, data);
  }

  me() : Observable<Response<User>> {
    return this.http.get<Response<User>>(`${environment.apiUrl}${this.url}me`);
  }

  sendResetPassword(data: SendResetPasswordRequest) : Observable<Response<User>> {
    return this.http.post<Response<User>>(`${environment.apiUrl}send-reset-password`, data);
  }

  resetPassword(data: ResetPasswordRequest) : Observable<Response<User>> {
    return this.http.put<Response<User>>(`${environment.apiUrl}${this.url}reset-password`, data);
  }

  sendVerifySession() : Observable<Response<User>> {
    return this.http.get<Response<User>>(`${environment.apiUrl}${this.url}send-verify`);
  }

  verifySession(data: VerifySessionRequest) : Observable<Response<Token>> {
    return this.http.post<Response<Token>>(`${environment.apiUrl}${this.url}verify`, data);
  }
}
