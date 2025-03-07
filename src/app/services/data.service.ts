import { Injectable, signal, WritableSignal } from '@angular/core';
import ErrorMessage from '../interfaces/error-message';
import { ModelsSignal } from '../interfaces/model-signal';
import { Model } from '../interfaces/models/model';
import { Modal } from '../interfaces/modal';
import { ModalType } from '../interfaces/modal-type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  models: WritableSignal<ModelsSignal<Model>> = signal({
    models: [],
    loading: false
  })

  modal: WritableSignal<Modal<any>> = signal({
    mode: ModalType.Default,
    show: false,
    data: undefined
  })

  setModal(mode: ModalType, show: boolean = true, data: any | undefined = undefined,
    action: boolean | undefined = undefined) {
    this.modal.update((value) => {
      return {
        mode: mode,
        show: show,
        data: data ?? value.data,
        action: action
      }
    })
  }

  constructor() { }

  info: WritableSignal<{
    title?: string
  }> = signal({})

  setErrorsMap(errors: ErrorMessage[]): Map<string, ErrorMessage[]> {
    let errorsMap = new Map<string, ErrorMessage[]>();
    errors.forEach(error => {
      let field = error.field ?? '_'
      if (errorsMap.get(field) == undefined) {
        errorsMap.set(field, [error])
      } else {
        errorsMap.get(field)!.push(error)
      }
    })
    return errorsMap
  }
}
