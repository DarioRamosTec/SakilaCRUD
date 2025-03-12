import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Customer } from '../interfaces/models/customer';
import { ModelService } from './model.service';
import { Address } from '../interfaces/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ModelService {
  override url: string = "auth/addresses/";
  override models: WritableSignal<ModelsSignal<Address>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

