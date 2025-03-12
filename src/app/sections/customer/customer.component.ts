import { Component, effect } from '@angular/core';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { Customer } from '../../interfaces/models/customer';
import { FormGroup, Validators } from '@angular/forms';
import { SectionExtension } from '../../interfaces/section-extension';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Store } from '../../interfaces/models/store';
import { ModelsSignal } from '../../interfaces/model-signal';
import { StoreService } from '../../services/store.service';
import { Address } from '../../interfaces/models/address';
import { AddressService } from '../../services/address.service';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputCheckboxComponent } from '../../components/inputs/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';

@Component({
  selector: 'section-customer',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent,
    InputCheckboxComponent, InputEmailComponent
  ],
  templateUrl: './customer.component.html'
})
export class CustomerComponent extends BaseSectionComponent {
  override models: Customer[] = [];
  override formDefault = {
    store_id: undefined,
    first_name: '',
    last_name: '',
    email: '',
    address_id: undefined,
    active: true
  }
  override form: FormGroup = this.formBuilder.group({
    store_id: [this.formDefault.store_id, [Validators.required]],
    first_name: [this.formDefault.first_name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    last_name: [this.formDefault.last_name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    email: [this.formDefault.email, [Validators.required, Validators.email, Validators.maxLength(320)]],
    address_id: [this.formDefault.address_id, [Validators.required]],
    active: [this.formDefault.active, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "create_date",
    type: "Date"
  }, {
    title: "active",
    type: "boolean"
  }, {
    title: "store_id",
    type: "Store"
  }, {
    title: "address_id",
    type: "Address"
  }]
  override id = "customer_id"

  stores: ModelsSignal<Store> = {
    models: [],
    loading: false
  }
  addresses: ModelsSignal<Address> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected customerService: CustomerService,
    protected storeService: StoreService, protected addressService: AddressService) {
    super(router, authService, dataService)
    effect(() => {
      this.stores = storeService.models()
      this.addresses = addressService.models()
    })
    this.modelService = customerService
    dataService.info.set({
      title: "Customers"
    })
    this.index()
    storeService.initModels()
    addressService.initModels()
  }

  get store_id() {
    return this.form.get('store_id');
  }
  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get email() {
    return this.form.get('email');
  }
  get address_id() {
    return this.form.get('address_id');
  }
  get active() {
    return this.form.get('active');
  }
}
