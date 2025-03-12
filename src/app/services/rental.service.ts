import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Payment } from '../interfaces/models/payment';
import { ModelService } from './model.service';
import { Rental } from '../interfaces/models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService extends ModelService {
  override url: string = "auth/rentals/";
  override models: WritableSignal<ModelsSignal<Rental>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

