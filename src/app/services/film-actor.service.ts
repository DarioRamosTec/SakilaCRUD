import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Actor } from '../interfaces/models/actor';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class FilmActorService extends ModelService {
  override url: string = "auth/film_actors/";
  override models: WritableSignal<ModelsSignal<Actor>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

