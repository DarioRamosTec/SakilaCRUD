import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelService } from './model.service';
import { ModelsSignal } from '../interfaces/model-signal';
import { Inventory } from '../interfaces/models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends ModelService {
  override url: string = "auth/inventories/";
  override models: WritableSignal<ModelsSignal<Inventory>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
