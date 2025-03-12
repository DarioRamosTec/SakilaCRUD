import { Injectable, signal, WritableSignal } from '@angular/core';
import { BaseService } from './base.service';
import { Model } from '../interfaces/models/model';
import { ModelsSignal } from '../interfaces/model-signal';
import { Observable } from 'rxjs';
import Response from '../interfaces/responses/response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends BaseService {
  models: WritableSignal<ModelsSignal<Model>> = signal({
    models: [],
    setTable: false,
    loading: false
  })

  index(page: number | undefined = undefined) : Observable<Response<Model[]>> {
    return this.http.get<Response<Model[]>>(`${environment.apiUrl}${this.url}${page ? `?page=${page}` : '' }`);
  }

  store(data: any) : Observable<Response<(Model)>> {
    return this.http.post<Response<Model>>(`${environment.apiUrl}${this.url}`, data);
  }

  update(id: number, data: any) : Observable<Response<Model>> {
    return this.http.put<Response<Model>>(`${environment.apiUrl}${this.url}${id}`, data);
  }

  destroy(id: number) : Observable<Response<Model>> {
    return this.http.delete<Response<Model>>(`${environment.apiUrl}${this.url}${id}`,);
  }

  initModels(overwrite: boolean = false) {
    if (this.models().models.length <= 0 || overwrite) {
      let self = this
      self.models.update((data) => {
        return {
          models: data.models,
          loading: true
        }
      })
      this.indexModels()
    }
  }

  indexModels(update: boolean = false, page: number | undefined = undefined) {
    let self = this
    this.index(page).subscribe({
      next(value) {
        self.models.update((data) => {
          let models = []
          if (update) {
            data.models.push(...value.data)
            models = data.models
          } else {
            models = value.data
          }

          return {
            models: models,
            loading: false
          }
        })
        if (value.meta?.nextPageUrl) {
          self.indexModels(true, +value.meta.nextPageUrl.split("?page=")[1])
        }
      },
      error(err) {
        self.models.update((data) => {
          return {
            models: data.models,
            loading: false,
            error: true
          }
        })
      },
    })
  }

  unshiftModels(overwrite: boolean = false, ...models: Model[]) {
    let self = this
    self.models.update((value) => {
      let values = models
      if (!overwrite) {
        values.push(...value.models)
      }
      return {
        models: models,
        setTable: value.setTable,
        loading: value.loading
      }
    })
  }
}
