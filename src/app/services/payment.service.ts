import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Store } from '../interfaces/models/store';
import { ModelService } from './model.service';
import { Payment } from '../interfaces/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ModelService {
  override url: string = "auth/payments/";
  override models: WritableSignal<ModelsSignal<Payment>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

