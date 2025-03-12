import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorBagComponent } from '../../error-bag/error-bag.component';

@Component({
  selector: 'input-checkbox',
  imports: [FormsModule, ReactiveFormsModule, ErrorBagComponent, TranslateModule],
  templateUrl: './input-checkbox.component.html'
})
export class InputCheckboxComponent extends InputBaseComponent {
  override type: string = "checkbox";
  @Input()
  subtitle: string | undefined
}

