import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Film } from '../../interfaces/models/film';
import { Inventory } from '../../interfaces/models/inventory';
import { Store } from '../../interfaces/models/store';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { FilmService } from '../../services/film.service';
import { InventoryService } from '../../services/inventory.service';
import { StoreService } from '../../services/store.service';
import { Payment } from '../../interfaces/models/payment';
import { Customer } from '../../interfaces/models/customer';
import { Staff } from '../../interfaces/models/staff';
import { Rental } from '../../interfaces/models/rental';
import { CustomerService } from '../../services/customer.service';
import { StaffService } from '../../services/staff.service';
import { PaymentService } from '../../services/payment.service';
import { RentalService } from '../../services/rental.service';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputCheckboxComponent } from '../../components/inputs/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'section-rental',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent],
  templateUrl: './rental.component.html'
})
export class RentalComponent extends BaseSectionComponent {
  override models: Payment[] = [];
  override formDefault = {
    rental_date: new Date(),
    return_date: new Date(),
    inventory_id: undefined,
    staff_id: undefined,
    customer_id: undefined,
  }
  override form: FormGroup = this.formBuilder.group({
    return_date: [this.formDefault.return_date, [Validators.required]],
    rental_date: [this.formDefault.rental_date, [Validators.required]],
    inventory_id: [this.formDefault.inventory_id, [Validators.required]],
    staff_id: [this.formDefault.staff_id, [Validators.required]],
    customer_id: [this.formDefault.customer_id, [Validators.required]]
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "customer_id",
    type: "Customer"
  }, {
    title: "staff_id",
    type: "Staff"
  }, {
    title: "inventory_id",
    type: "Inventory"
  }]
  override id = "rental_id"

  customers: ModelsSignal<Customer> = {
    models: [],
    loading: false
  }
  staffs: ModelsSignal<Staff> = {
    models: [],
    loading: false
  }
  inventories: ModelsSignal<Inventory> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected paymentService: PaymentService,
    protected customerService: CustomerService, protected staffService: StaffService,
    protected rentalService: RentalService, protected inventoryService: InventoryService) {
    super(router, authService, dataService)
    effect(() => {
      this.customers = customerService.models()
      this.staffs = staffService.models()
      this.inventories = inventoryService.models()
    })
    this.modelService = rentalService
    dataService.info.set({
      title: "Rentals"
    })
    this.index()
    customerService.initModels()
    staffService.initModels()
    inventoryService.initModels()
  }

  get customer_id() {
    return this.form.get('customer_id');
  }
  get staff_id() {
    return this.form.get('staff_id');
  }
  get inventory_id() {
    return this.form.get('inventory_id');
  }
  get return_date() {
    return this.form.get('return_date');
  }
  get rental_date() {
    return this.form.get('rental_date');
  }
}

