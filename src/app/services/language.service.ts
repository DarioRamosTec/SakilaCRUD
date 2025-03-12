import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelsSignal } from '../interfaces/model-signal';
import { Store } from '../interfaces/models/store';
import { ModelService } from './model.service';
import { Language } from '../interfaces/models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends ModelService {
  override url: string = "auth/languages/";
  override models: WritableSignal<ModelsSignal<Language>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}

