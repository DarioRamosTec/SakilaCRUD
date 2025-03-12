import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from '../../interfaces/models/actor';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { ActorService } from '../../services/actor.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Category } from '../../interfaces/models/category';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'section-category',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputTextComponent],
  templateUrl: './category.component.html'
})
export class CategoryComponent extends BaseSectionComponent {
  override models: Category[] = [];
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
  override id = "category_id"

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected categoryService: CategoryService) {
    super(router, authService, dataService)
    this.modelService = categoryService
    dataService.info.set({
      title: "Categories"
    })
    this.index()
  }

  get name() {
    return this.form.get('name');
  }
}
