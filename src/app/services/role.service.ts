import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Staff } from '../interfaces/models/staff';
import { ModelService } from './model.service';
import { Role } from '../interfaces/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ModelService {
  override url: string = "auth/roles/";
  override models: WritableSignal<ModelsSignal<Role>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
