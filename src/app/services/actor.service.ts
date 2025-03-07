import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelService } from './model.service';
import { ModelsSignal } from '../interfaces/model-signal';
import { Actor } from '../interfaces/models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService extends ModelService {
  override url: string = "auth/actors/";
  override models: WritableSignal<ModelsSignal<Actor>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
