import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Address } from '../../interfaces/models/address';
import { Payment } from '../../interfaces/models/payment';
import { Store } from '../../interfaces/models/store';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { StaffService } from '../../services/staff.service';
import { StoreService } from '../../services/store.service';
import { City } from '../../interfaces/models/city';
import { CityService } from '../../services/city.service';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputCheckboxComponent } from '../../components/inputs/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { InputPasswordComponent } from '../../components/inputs/input-password/input-password.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'section-address',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent],
  templateUrl: './address.component.html'
})
export class AddressComponent extends BaseSectionComponent {
  override models: Payment[] = [];
  override formDefault = {
    address: "",
    address2: "",
    district: "",
    city_id: undefined,
    postal_code: "",
    phone: "",
    location: ""
  }
  override form: FormGroup = this.formBuilder.group({
    address: [this.formDefault.address, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    address2: [this.formDefault.address2, [Validators.minLength(2), Validators.maxLength(150)]],
    district: [this.formDefault.district, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    city_id: [this.formDefault.city_id, [Validators.required]],
    postal_code: [this.formDefault.postal_code, [Validators.minLength(2), Validators.maxLength(150)]],
    phone: [this.formDefault.phone, [Validators.minLength(2), Validators.maxLength(150)]],
    location: [this.formDefault.location, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]]
  });
  override exceptions: string[] = ["last_update", "deleted_at", "location"]
  override extensions: SectionExtension[] = [{
    title: "city_id",
    type: "City"
  }]
  override id = "address_id"

  cities: ModelsSignal<City> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected staffService: StaffService,
    protected addressService: AddressService, protected cityService: CityService) {
    super(router, authService, dataService)
    effect(() => {
      this.cities = cityService.models()
    })
    this.modelService = addressService
    dataService.info.set({
      title: "Cities"
    })
    this.index()
    cityService.initModels()
  }

  get address() {
    return this.form.get('address');
  }
  get address2() {
    return this.form.get('address2');
  }
  get district() {
    return this.form.get('district');
  }
  get city_id() {
    return this.form.get('city_id');
  }
  get postal_code() {
    return this.form.get('postal_code');
  }
  get phone() {
    return this.form.get('phone');
  }
  get location() {
    return this.form.get('location');
  }
}



