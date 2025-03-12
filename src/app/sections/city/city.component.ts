import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/models/category';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { DataService } from '../../services/data.service';
import { CityService } from '../../services/city.service';
import { City } from '../../interfaces/models/city';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Country } from '../../interfaces/models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'section-city',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent],
  templateUrl: './city.component.html'
})
export class CityComponent extends BaseSectionComponent {
  override models: City[] = [];
  override formDefault = {
    city: '',
    country_id: undefined,
  }
  override form: FormGroup = this.formBuilder.group({
    city: [this.formDefault.city, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    country_id: [this.formDefault.country_id, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "last_update",
    type: "Date"
  }, {
    title: "country_id",
    type: "Country"
  }]
  override id = "city_id"

  countries: ModelsSignal<Country> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected cityService: CityService,
    protected countryService: CountryService) {
    super(router, authService, dataService)
    effect(() => {
      this.countries = countryService.models()
    })
    this.modelService = cityService
    dataService.info.set({
      title: "Cities"
    })
    this.index()
    countryService.initModels()
  }

  get city() {
    return this.form.get('city');
  }
  get country_id() {
    return this.form.get('country_id');
  }
}
