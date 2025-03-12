import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Category } from '../interfaces/models/category';
import { ModelService } from './model.service';
import { City } from '../interfaces/models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ModelService {
  override url: string = "auth/cities/";
  override models: WritableSignal<ModelsSignal<City>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
