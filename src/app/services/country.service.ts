import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelService } from './model.service';
import { Country } from '../interfaces/models/country';
import { ModelsSignal } from '../interfaces/model-signal';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends ModelService {
  override url: string = "auth/countries/";
  override models: WritableSignal<ModelsSignal<Country>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
