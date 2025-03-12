import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from '../../interfaces/models/actor';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { ActorService } from '../../services/actor.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../interfaces/models/language';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'section-language',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent],
  templateUrl: './language.component.html'
})
export class LanguageComponent extends BaseSectionComponent {
  override models: Language[] = [];
  override formDefault = {
    name: '',
  }
  override form: FormGroup = this.formBuilder.group({
    name: [this.formDefault.name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "last_update",
    type: "Date"
  }]
  override id = "language_id"

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected languageService: LanguageService) {
    super(router, authService, dataService)
    this.modelService = languageService
    dataService.info.set({
      title: "Languages"
    })
    this.index()
  }

  get name() {
    return this.form.get('name');
  }
}

