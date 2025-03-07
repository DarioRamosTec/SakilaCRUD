import { Component, effect, Input } from '@angular/core';
import { AuthLayoutComponent } from "../layouts/auth-layout/auth-layout.component";
import Section from '../../interfaces/section';
import { SectionExtension } from '../../interfaces/section-extension';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { SectionAction } from '../../interfaces/section-action';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ActorService } from '../../services/actor.service';
import { Model } from '../../interfaces/models/model';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalType } from '../../interfaces/modal-type';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-section',
  imports: [AuthLayoutComponent, TranslateModule, ReactiveFormsModule, RouterLink],
  templateUrl: './section.component.html'
})
export class SectionComponent extends BaseComponent {
  @Input()
  models: Model[] = []
  @Input()
  loading: boolean = false
  @Input()
  type: string = "Model"
  @Input()
  actions: SectionAction = {
    create: true
  }
  @Input()
  exceptions: string[] = []
  @Input()
  extensions: SectionExtension[] = []
  @Input()
  methodExtensions: string[] = []
  @Input()
  name: string = 'name'

  sections: Section[] = []
  searchControl: FormControl = new FormControl("")
  pagination?: Pagination
  shownModels: (any | Model)[] = []
  href = ""

  dropdownSectionFilterId = `dropdownSectionFilter${this._id++}`
  dropdownSectionFilterButtonId = `dropdownSectionFilterButton${this._id++}`
  dropdownSectionActionId = `dropdownSectionAction${this._id++}`
  dropdownSectionActionButtonId = `dropdownSectionActionButton${this._id++}`

  constructor(protected activatedRoute: ActivatedRoute, protected location: Location,
    protected actorService: ActorService, protected dataService: DataService,
    protected router: Router)
  {
    super()
    effect(() => {
      let isEmpty = this.models.length == 0
      this.models = dataService.models().models
      this.loading = dataService.models().loading
      if (dataService.models().setTable || (isEmpty && this.models.length > 0)) {
        this.pagination = dataService.models().meta
        this.setTable()
      }
      this.showModels()
    })
    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    this.href = urlTree.toString();
  }

  ngOnInit(): void {
    this.setTable()
    this.showModels()
  }

  setTable() {
    this.sections = []
    if (this.models.length > 0) {
      let base = this.models[0]
      for (let key in base) {
        if (!this.exceptions.find((exception) => exception == key)) {
          let extension = this.extensions.find((extension) => extension.title == key)
          if (extension) {
            this.sections.push(extension)
          } else {
            this.sections.push({
              title: this.getTitle(key),
              type: typeof(this.getIndex(base, key))
            })
          }
        }
      }
    }
  }

  getTitle(name: string): string {
    return name
  }

  getIndex(value: any, item: string, type: string = this.type) {
    switch (type) {
      default:
        return value[item as keyof Model]
    }
  }

  getDate(date: string) {
    return new Date(date).toString()
  }

  reload() {
    location.reload();
  }

  search(skip: boolean = false) {
    let self = this
    self.showModels()
  }

  showModels() {
    this.shownModels = this.models
  }

  getActor(id: number) {
    let model = this.actorService.models().models.find((value) => value.actor_id == id)
    return model?.first_name
  }

  getExtensionValue(sectionExtension: SectionExtension, value: any) {
    switch (sectionExtension.type) {
      case "Actor":
        return this.getActor(value)
      default:
        return value
    }
  }

  create() {
    this.dataService.setModal(ModalType.Create)
  }

  edit(value: any) {
    this.dataService.setModal(ModalType.Edit, true, value)
  }

  delete(value: any) {
    this.dataService.setModal(ModalType.Delete, true, value)
  }

  actionDelete() {
    this.dataService.setModal(ModalType.Delete, true, undefined, true)
  }

  getPagination() {
    return new Array<number>(this.pagination?.lastPage ?? 0)
  }

  previousPage(isNext: boolean = false, pagination: Pagination) {
    return (isNext ? pagination.nextPageUrl.split("?page=")[1] : pagination.previousPageUrl?.split("?page=")[1])
  }

}
