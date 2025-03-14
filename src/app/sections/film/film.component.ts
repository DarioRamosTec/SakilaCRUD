import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { City } from '../../interfaces/models/city';
import { Payment } from '../../interfaces/models/payment';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { DataService } from '../../services/data.service';
import { StaffService } from '../../services/staff.service';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../interfaces/models/language';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'section-film',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent, InputSelectModelComponent],
  templateUrl: './film.component.html'
})
export class FilmComponent extends BaseSectionComponent {
  override models: Payment[] = [];
  override formDefault = {
    title: "",
    description: "",
    release_year: 0,
    language_id: undefined,
    original_language_id: undefined,
    rental_duration: 0,
    rental_rate: "",
    length: 0,
    replacement_cost: 0,
    rating: "",
    special_features: "",
  }
  override form: FormGroup = this.formBuilder.group({
    title: [this.formDefault.title, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    description: [this.formDefault.description, [Validators.minLength(2), Validators.maxLength(4500)]],
    release_year: [this.formDefault.release_year, [Validators.required, Validators.min(0), Validators.maxLength(10000)]],
    language_id: [this.formDefault.language_id, [Validators.required]],
    original_language_id: [this.formDefault.language_id, []],
    rental_duration: [this.formDefault.rental_duration, [Validators.required, Validators.min(0), Validators.maxLength(10000)]],
    rental_rate: [this.formDefault.rental_rate, [Validators.required, Validators.min(0), Validators.maxLength(10)]],
    length: [this.formDefault.length, [Validators.required, Validators.min(0), Validators.maxLength(10000)]],
    replacement_cost: [this.formDefault.replacement_cost, [Validators.required, Validators.min(0), Validators.maxLength(10000)]],
    rating: [this.formDefault.rating, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    special_features: [this.formDefault.special_features, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],

  });
  override exceptions: string[] = ["last_update", "deleted_at", "location"]
  override extensions: SectionExtension[] = [{
    title: "language_id",
    type: "Language"
  }]
  override id = "film_id"

  languages: ModelsSignal<Language> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected filmService: FilmService,
    protected languageService: LanguageService, protected cityService: CityService) {
    super(router, authService, dataService)
    effect(() => {
      this.languages = languageService.models()
    })
    this.modelService = filmService
    dataService.info.set({
      title: "Films"
    })
    this.index()
    languageService.initModels()
  }

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get release_year() {
    return this.form.get('release_year');
  }
  get language_id() {
    return this.form.get('language_id');
  }
  get original_language_id() {
    return this.form.get('original_language_id');
  }
  get rental_duration() {
    return this.form.get('rental_duration');
  }
  get rental_rate() {
    return this.form.get('rental_rate');
  }
  get length() {
    return this.form.get('length');
  }
  get replacement_cost() {
    return this.form.get('replacement_cost');
  }
  get rating() {
    return this.form.get('rating');
  }
  get special_features() {
    return this.form.get('special_features');
  }
}
