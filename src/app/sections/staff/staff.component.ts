import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Customer } from '../../interfaces/models/customer';
import { Inventory } from '../../interfaces/models/inventory';
import { Payment } from '../../interfaces/models/payment';
import { Staff } from '../../interfaces/models/staff';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { DataService } from '../../services/data.service';
import { InventoryService } from '../../services/inventory.service';
import { PaymentService } from '../../services/payment.service';
import { RentalService } from '../../services/rental.service';
import { StaffService } from '../../services/staff.service';
import { Store } from '../../interfaces/models/store';
import { Address } from '../../interfaces/models/address';
import { StoreService } from '../../services/store.service';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { InputEmailComponent } from "../../components/inputs/input-email/input-email.component";
import { AddressService } from '../../services/address.service';
import { InputCheckboxComponent } from "../../components/inputs/input-checkbox/input-checkbox.component";
import { InputPasswordComponent } from "../../components/inputs/input-password/input-password.component";

@Component({
  selector: 'section-staff',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent, InputEmailComponent, InputCheckboxComponent, InputPasswordComponent],
  templateUrl: './staff.component.html'
})
export class StaffComponent extends BaseSectionComponent {
  override models: Payment[] = [];
  override formDefault = {
    first_name: "",
    last_name: "",
    address_id: undefined,
    picture: undefined,
    email: "",
    store_id: undefined,
    active: true,
    username: "",
    password: ""
  }
  override form: FormGroup = this.formBuilder.group({
    first_name: [this.formDefault.first_name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    last_name: [this.formDefault.last_name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    address_id: [this.formDefault.address_id, [Validators.required]],
    picture: [this.formDefault.picture, [Validators.required]],
    email: [this.formDefault.email, [Validators.required, Validators.email]],
    store_id: [this.formDefault.store_id, [Validators.required]],
    active: [this.formDefault.active, [Validators.required]],
    username: [this.formDefault.username, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    password: [this.formDefault.password, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]]
  });
  override exceptions: string[] = ["last_update", "deleted_at", "password", "picture"]
  override extensions: SectionExtension[] = [{
    title: "address_id",
    type: "Address"
  }, {
    title: "store_id",
    type: "Store"
  }, {
    title: "picture",
    type: "BlobPicture"
  }]
  override id = "staff_id"

  addreses: ModelsSignal<Address> = {
    models: [],
    loading: false
  }
  stores: ModelsSignal<Store> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected staffService: StaffService,
    protected addressService: AddressService, protected storeService: StoreService) {
    super(router, authService, dataService)
    effect(() => {
      this.addreses = addressService.models()
      this.stores = storeService.models()
    })
    this.modelService = staffService
    dataService.info.set({
      title: "Staffs"
    })
    this.index()
    addressService.initModels()
    storeService.initModels()
  }

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get address_id() {
    return this.form.get('address_id');
  }
  get picture() {
    return this.form.get('picture');
  }
  get email() {
    return this.form.get('email');
  }
  get store_id() {
    return this.form.get('store_id');
  }
  get active() {
    return this.form.get('active');
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
}


