import { Component, effect } from '@angular/core';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Language } from '../../interfaces/models/language';
import { Payment } from '../../interfaces/models/payment';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { DataService } from '../../services/data.service';
import { FilmService } from '../../services/film.service';
import { LanguageService } from '../../services/language.service';
import { Role } from '../../interfaces/models/role';
import { RoleService } from '../../services/role.service';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { InputPasswordComponent } from '../../components/inputs/input-password/input-password.component';
import User from '../../interfaces/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'section-user',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent,
    InputEmailComponent, InputSelectModelComponent
  ],
  templateUrl: './user.component.html'
})
export class UserComponent extends BaseSectionComponent {
  override models: User[] = [];
  override formDefault = {
    fullName: "",
    email: "",
    password: "",
    role_id: undefined,
  }
  override form: FormGroup = this.formBuilder.group({
    fullName: [this.formDefault.fullName, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    email: [this.formDefault.email, [Validators.required, Validators.email]],
    password: [this.formDefault.password, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    role_id: [this.formDefault.role_id, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at", "password", "created_at", "updated_at", "verify_code"]
  override extensions: SectionExtension[] = [{
    title: "role_id",
    type: "Role"
  }]
  override id = "id"

  roles: ModelsSignal<Role> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected userService: UserService,
    protected roleService: RoleService, protected cityService: CityService) {
    super(router, authService, dataService)
    effect(() => {
      this.roles = roleService.models()
    })
    this.modelService = userService
    dataService.info.set({
      title: "Users"
    })
    this.index()
    roleService.initModels()
  }

  get email() {
    return this.form.get('email');
  }
  get fullName() {
    return this.form.get('fullName');
  }
  get role_id() {
    return this.form.get('role_id');
  }
  get password() {
    return this.form.get('password');
  }
}

