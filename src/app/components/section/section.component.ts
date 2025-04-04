import { Component, effect, Input, inject } from '@angular/core';
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
import { CountryService } from '../../services/country.service';
import { StoreService } from '../../services/store.service';
import { AddressService } from '../../services/address.service';
import { InventoryService } from '../../services/inventory.service';
import { FilmService } from '../../services/film.service';
import { CustomerService } from '../../services/customer.service';
import { StaffService } from '../../services/staff.service';
import { RentalService } from '../../services/rental.service';
import { CityService } from '../../services/city.service';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';

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

  authService = inject(AuthService)

  constructor(protected activatedRoute: ActivatedRoute, protected location: Location,
    protected actorService: ActorService, protected dataService: DataService,
    protected router: Router, protected countryService: CountryService,
    protected storeService: StoreService, protected addressService: AddressService,
    protected inventoryService: InventoryService, protected filmService: FilmService,
    protected customerService: CustomerService, protected staffService: StaffService,
    protected rentalService: RentalService, protected cityService: CityService,
    protected roleService: RoleService)
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
    let val = value[item as keyof Model]
    val = (val == "" ? null : val )
    return val
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

  getCountry(id: number) {
    let model = this.countryService.models().models.find((value) => value.country_id == id)
    return model?.country
  }

  getAddress(id: number) {
    let model = this.addressService.models().models.find((value) => value.address_id == id)
    return model?.address
  }

  getStore(id: number) {
    let model = this.storeService.models().models.find((value) => value.store_id == id)
    return model?.store_id
  }

  getInventory(id: number) {
    let model = this.inventoryService.models().models.find((value) => value.inventory_id == id)
    return model?.inventory_id
  }

  getFilm(id: number) {
    let model = this.filmService.models().models.find((value) => value.film_id == id)
    return model?.title
  }

  getCustomer(id: number) {
    let model = this.customerService.models().models.find((value) => value.customer_id == id)
    return model?.first_name
  }

  getStaff(id: number) {
    let model = this.staffService.models().models.find((value) => value.staff_id == id)
    return model?.first_name
  }

  getCity(id: number) {
    let model = this.cityService.models().models.find((value) => value.city_id == id)
    return model?.city
  }

  getRental(id: number) {
    let model = this.rentalService.models().models.find((value) => value.rental_id == id)
    return model?.rental_date
  }

  getRole(id: number) {
    let model = this.roleService.models().models.find((value) => value.id == id)
    return model?.name
  }

  getBlobPicture(value: any) {
    if (value) {
      var url = window.URL || window.webkitURL;
      var imageSrc = url.createObjectURL(value.data);
      return undefined
    }
    return value
  }

  getExtensionValue(sectionExtension: SectionExtension, value: any) {
    switch (sectionExtension.type) {
      case "Actor": return this.getActor(value)
      case "Country": return this.getCountry(value)
      case "Store": return this.getStore(value)
      case "Address": return this.getAddress(value)
      case "Inventory": return this.getInventory(value)
      case "Film": return this.getFilm(value)
      case "Customer": return this.getCustomer(value)
      case "Staff": return this.getStaff(value)
      case "City": return this.getCity(value)
      case "Rental": return this.getRental(value)
      case "Role": return this.getRole(value)
      case "BlobPicture": return this.getBlobPicture(value)
      default: return value
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
