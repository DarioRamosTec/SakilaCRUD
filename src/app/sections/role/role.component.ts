import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsSignal } from '../../interfaces/model-signal';
import { Role } from '../../interfaces/models/role';
import User from '../../interfaces/models/user';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { DataService } from '../../services/data.service';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'section-role',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent],
  templateUrl: './role.component.html'
})
export class RoleComponent extends BaseSectionComponent {
  override models: Role[] = [];
  override formDefault = {
    name: "",
  }
  override form: FormGroup = this.formBuilder.group({
    name: [this.formDefault.name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
  });
  override exceptions: string[] = ["last_update", "deleted_at", "created_at", "updated_at"]
  override extensions: SectionExtension[] = []
  override id = "id"

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected userService: UserService,
    protected roleService: RoleService, protected cityService: CityService) {
    super(router, authService, dataService)
    this.modelService = roleService
    dataService.info.set({
      title: "Roles"
    })
    this.index()
  }

  get name() {
    return this.form.get('name');
  }
}
