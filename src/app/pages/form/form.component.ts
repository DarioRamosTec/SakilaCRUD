import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import ErrorMessage from '../../interfaces/error-message';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'form',
  imports: [],
  template: `
  `
})
export class FormComponent extends BaseComponent {
  protected form: FormGroup | undefined
  protected formBuilder = inject(FormBuilder);
  protected errors: Map<string, ErrorMessage[]> = new Map();
  protected loading = false;

  constructor(protected router: Router, protected authService: AuthService,
    protected dataService: DataService
  ) {
    super()
  }

  submit() {}
  destroy(_: any) {}

}
