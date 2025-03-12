import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Address } from '../../interfaces/models/address';
import { Customer } from '../../interfaces/models/customer';
import { Store } from '../../interfaces/models/store';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { DataService } from '../../services/data.service';
import { StoreService } from '../../services/store.service';
import { FilmService } from '../../services/film.service';
import { Film } from '../../interfaces/models/film';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { Inventory } from '../../interfaces/models/inventory';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'section-inventory',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputSelectModelComponent],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent extends BaseSectionComponent {
  override models: Inventory[] = [];
  override formDefault = {
    store_id: undefined,
    film_id: undefined,
  }
  override form: FormGroup = this.formBuilder.group({
    store_id: [this.formDefault.store_id, [Validators.required]],
    film_id: [this.formDefault.film_id, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "store_id",
    type: "Store"
  }, {
    title: "film_id",
    type: "Film"
  }]
  override id = "inventory_id"

  stores: ModelsSignal<Store> = {
    models: [],
    loading: false
  }
  films: ModelsSignal<Film> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected inventoryService: InventoryService,
    protected storeService: StoreService, protected filmService: FilmService) {
    super(router, authService, dataService)
    effect(() => {
      this.stores = storeService.models()
      this.films = filmService.models()
    })
    this.modelService = inventoryService
    dataService.info.set({
      title: "Inventories"
    })
    this.index()
    filmService.initModels()
    storeService.initModels()
  }

  get film_id() {
    return this.form.get('film_id');
  }
  get store_id() {
    return this.form.get('store_id');
  }
}
