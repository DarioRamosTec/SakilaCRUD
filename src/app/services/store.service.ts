import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Customer } from '../interfaces/models/customer';
import { ModelService } from './model.service';
import { Store } from '../interfaces/models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends ModelService {
  override url: string = "auth/stores/";
  override models: WritableSignal<ModelsSignal<Store>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
