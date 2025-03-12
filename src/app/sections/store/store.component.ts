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
import { Staff } from '../../interfaces/models/staff';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputCheckboxComponent } from '../../components/inputs/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { InputPasswordComponent } from '../../components/inputs/input-password/input-password.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'section-store',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputSelectModelComponent],
  templateUrl: './store.component.html'
})
export class StoreComponent extends BaseSectionComponent {
  override models: Payment[] = [];
  override formDefault = {
    manager_staff_id: undefined,
    address_id: undefined,
  }
  override form: FormGroup = this.formBuilder.group({
    manager_staff_id: [this.formDefault.manager_staff_id, [Validators.required]],
    address_id: [this.formDefault.address_id, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "manager_staff_id",
    type: "Staff"
  }, {
    title: "address_id",
    type: "Address"
  }]
  override id = "store_id"

  staffs: ModelsSignal<Staff> = {
    models: [],
    loading: false
  }
  addreses: ModelsSignal<Address> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected staffService: StaffService,
    protected addressService: AddressService, protected storeService: StoreService) {
    super(router, authService, dataService)
    effect(() => {
      this.staffs = staffService.models()
      this.addreses = addressService.models()
    })
    this.modelService = storeService
    dataService.info.set({
      title: "Stores"
    })
    this.index()
    staffService.initModels()
    addressService.initModels()
  }

  get address_id() {
    return this.form.get('address_id');
  }
  get manager_staff_id() {
    return this.form.get('manager_staff_id');
  }
}



