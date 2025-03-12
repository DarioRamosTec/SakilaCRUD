import { Injectable, signal, WritableSignal } from '@angular/core';
import { ModelService } from './model.service';
import { ModelsSignal } from '../interfaces/model-signal';
import { Category } from '../interfaces/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ModelService {
  override url: string = "auth/categories/";
  override models: WritableSignal<ModelsSignal<Category>> = signal({
    models: [],
    setTable: false,
    loading: false
  })
}
