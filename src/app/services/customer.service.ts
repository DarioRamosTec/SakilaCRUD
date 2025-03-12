import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Country } from '../interfaces/models/country';
import { ModelService } from './model.service';
import { Customer } from '../interfaces/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ModelService {
  override url: string = "auth/customers/";
  override models: WritableSignal<ModelsSignal<Customer>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

