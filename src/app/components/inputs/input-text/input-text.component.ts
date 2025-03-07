import { Component } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorBagComponent } from "../../error-bag/error-bag.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'input-text',
  imports: [FormsModule, ReactiveFormsModule, ErrorBagComponent, TranslateModule],
  templateUrl: './input-text.component.html'
})
export class InputTextComponent extends InputBaseComponent {
  override type: string = "text";
}
