import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Role } from '../interfaces/models/role';
import { ModelService } from './model.service';
import User from '../interfaces/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ModelService {
  override url: string = "auth/users/";
  override models: WritableSignal<ModelsSignal<User>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

