import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../../interfaces/models/city';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { DataService } from '../../services/data.service';
import { Country } from '../../interfaces/models/country';
import { CountryService } from '../../services/country.service';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'section-country',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent],
  templateUrl: './country.component.html'
})
export class CountryComponent extends BaseSectionComponent {
  override models: Country[] = [];
  override formDefault = {
    country: '',
  }
  override form: FormGroup = this.formBuilder.group({
    country: [this.formDefault.country, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "last_update",
    type: "Date"
  }]
  override id = "country_id"

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected countryService: CountryService) {
    super(router, authService, dataService)
    this.modelService = countryService
    dataService.info.set({
      title: "Countries"
    })
    this.index()
  }

  get country() {
    return this.form.get('country');
  }
}

