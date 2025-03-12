import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Inventory } from '../interfaces/models/inventory';
import { ModelService } from './model.service';
import { Film } from '../interfaces/models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService extends ModelService {
  override url: string = "auth/films/";
  override models: WritableSignal<ModelsSignal<Film>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

