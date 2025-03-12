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
  selector: 'section-payment',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent],
  templateUrl: './payment.component.html'
})
export class PaymentComponent extends BaseSectionComponent {
  override models: Payment[] = [];
  override formDefault = {
    customer_id: undefined,
    staff_id: undefined,
    rental_id: undefined,
    amount: 0,
    payment_date: new Date(),
  }
  override form: FormGroup = this.formBuilder.group({
    customer_id: [this.formDefault.customer_id, [Validators.required]],
    staff_id: [this.formDefault.staff_id, [Validators.required]],
    rental_id: [this.formDefault.rental_id, [Validators.required]],
    amount: [this.formDefault.amount, [Validators.required, Validators.min(0), Validators.max(100)]],
    payment_date: [this.formDefault.payment_date, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "customer_id",
    type: "Customer"
  }, {
    title: "staff_id",
    type: "Staff"
  }, {
    title: "rental_id",
    type: "Rental"
  }]
  override id = "payment_id"

  customers: ModelsSignal<Customer> = {
    models: [],
    loading: false
  }
  staffs: ModelsSignal<Staff> = {
    models: [],
    loading: false
  }
  rentals: ModelsSignal<Rental> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected paymentService: PaymentService,
    protected customerService: CustomerService, protected staffService: StaffService,
    protected rentalService: RentalService) {
    super(router, authService, dataService)
    effect(() => {
      this.customers = customerService.models()
      this.staffs = staffService.models()
      this.rentals = rentalService.models()
    })
    this.modelService = paymentService
    dataService.info.set({
      title: "Payments"
    })
    this.index()
    customerService.initModels()
    staffService.initModels()
    rentalService.initModels()
  }

  get customer_id() {
    return this.form.get('customer_id');
  }
  get staff_id() {
    return this.form.get('staff_id');
  }
  get rental_id() {
    return this.form.get('rental_id');
  }
  get amount() {
    return this.form.get('amount');
  }
  get payment_date() {
    return this.form.get('payment_date');
  }
}

