import { Component, Input } from '@angular/core';
import ErrorMessage from '../../../interfaces/error-message';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorBagComponent } from "../../error-bag/error-bag.component";

@Component({
  selector: 'form-base',
  imports: [ErrorBagComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './form-base.component.html'
})
export class FormBaseComponent {
  @Input()
  form: FormGroup = new FormGroup({});
  @Input()
  showError: boolean = false
  @Input()
  errors: Map<string, ErrorMessage[]> = new Map()

}
