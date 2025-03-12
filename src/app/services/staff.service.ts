import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Payment } from '../interfaces/models/payment';
import { ModelService } from './model.service';
import { Staff } from '../interfaces/models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends ModelService {
  override url: string = "auth/staffs/";
  override models: WritableSignal<ModelsSignal<Staff>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
