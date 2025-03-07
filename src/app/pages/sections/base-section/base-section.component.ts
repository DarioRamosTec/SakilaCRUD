import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Model } from '../../../interfaces/models/model';
import { SectionExtension } from '../../../interfaces/section-extension';
import { SectionComponent } from '../../../components/section/section.component';
import { ModelService } from '../../../services/model.service';
import { FormComponent } from '../../form/form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ModalType } from '../../../interfaces/modal-type';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-base-section',
  imports: [],
  templateUrl: './base-section.component.html'
})
export class BaseSectionComponent extends FormComponent {
  models: Model[] = []
  exceptions: string[] = []
  extensions: SectionExtension[] = []
  methodExtensions: string[] = []
  idEditModel: number | undefined
  formDefault: any = {}

  arrayDataForm: boolean = false
  indexData: number = 0
  modelService: ModelService = inject(ModelService)
  @ViewChild(SectionComponent) section!: SectionComponent;
  convertions: Map<string, string> = new Map<string, string>()

  id = "id"
  activatedRoute = inject(ActivatedRoute)
  page = 1
  firstPage = true

  constructor(router: Router, authService: AuthService,
    dataService: DataService) {
    super(router, authService, dataService)
    effect(() => {
      switch (this.dataService.modal().mode) {
        case ModalType.Create:
          this.form?.patchValue(this.formDefault)
        break;
        case ModalType.Edit:
          this.form?.patchValue(this.dataService.modal().data)
        break;
      }
    })
    effect(() => {
      if (this.dataService.modal().action == true) {
        this.destroy(this.dataService.modal().data)
      }
    })

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.firstPage = false
        this.page = params['page'] ?? 1
        if (!this.firstPage) {
          this.index(false)
        }
      }
    );
  }

  index(reloadAll: boolean = true) {
    let self = this
    if (reloadAll) {
      this.dataService.models.update((data) => {
        return {
          models: [],
          loading: true
        }
      })
    }
    this.modelService.index(this.page).subscribe({
      next(value) {
        self.dataService.models.update((data) => {
          return {
            models: value.data,
            meta: value.meta,
            setTable: true,
            loading: false
          }
        })
      },
      error(err) {
        self.dataService.models.update((data) => {
          return {
            models: data.models,
            meta: undefined,
            loading: false,
            error: true
          }
        })
      },
    })
  }

  override submit(forceEdit: boolean | undefined = undefined) {
    if (forceEdit || this.dataService.modal().mode == ModalType.Edit) {
      this.modelService.update(this.dataService.modal().data[this.id], this.form?.getRawValue()).subscribe({
        next(value) {
          //self.dataService.models.update((data) => {
            //let copy = data.models.slice()
            //let index = copy.findIndex((model) => model.id == value.data.id)
            //copy[index] = value.data
            //return {
              //models: copy,
              //loading: false
            //}
          //})
          //self.modelService.initModels(true)
          window.location.reload()
        },
        error(err) {
        },
      })
    } else {
      this.modelService.store(this.form?.getRawValue()).subscribe({
        next(value) {
          //self.dataService.models.update((data) => {
            //let copy = data.models.slice()
            //if (self.arrayDataForm) {
              //let dataArray = (value.data as any)
              //copy.unshift(...dataArray)
            //} else {
              //copy.unshift(value.data)
            //}
            //return {
              //models: copy,
              //loading: false
            //}
          //})
          //self.modelService.initModels(true)
          //self.section.create(false)
          window.location.reload()
        },
        error(err) {
        },
      })
    }
  }

  override destroy(modelDestroy: any) {
    let self = this
    this.modelService.destroy(modelDestroy[this.id]).subscribe({
      next(value) {
        //self.dataService.models.update((data) => {
          //let copy = data.models.slice()
          //let index = copy.findIndex((model) => model[self.id as keyof Model] == modelDestroy[self.id])
          //copy.splice(index, 1)
          //return {
            //models: copy,
            //loading: false
          //}
        //})
        //self.modelService.initModels(true)
        window.location.reload()
      },
      error(err) {

      },
    })
  }
}
