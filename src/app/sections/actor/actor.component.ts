import { Component } from '@angular/core';
import { SectionComponent } from "../../components/section/section.component";
import { DataService } from '../../services/data.service';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { FormBaseComponent } from "../../components/forms/form-base/form-base.component";
import { ButtonBaseComponent } from "../../components/forms/buttons/button-base/button-base.component";
import { Actor } from '../../interfaces/models/actor';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputTextComponent } from "../../components/inputs/input-text/input-text.component";
import { ActorService } from '../../services/actor.service';
import { SectionExtension } from '../../interfaces/section-extension';

@Component({
  selector: 'section-actor',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent],
  templateUrl: './actor.component.html'
})
export class ActorComponent extends BaseSectionComponent {
  override models: Actor[] = [];
  override formDefault = {
    first_name: '',
    last_name: '',
  }
  override form: FormGroup = this.formBuilder.group({
    first_name: [this.formDefault.first_name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    last_name: [this.formDefault.last_name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "last_update",
    type: "Date"
  }]
  override id = "actor_id"

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected actorService: ActorService) {
    super(router, authService, dataService)
    this.modelService = actorService
    dataService.info.set({
      title: "Actors"
    })
    this.index()
  }

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
}
