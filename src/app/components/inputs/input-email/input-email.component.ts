import { Component } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorBagComponent } from "../../error-bag/error-bag.component";

@Component({
  selector: 'input-email',
  imports: [FormsModule, ReactiveFormsModule, ErrorBagComponent],
  templateUrl: './input-email.component.html'
})
export class InputEmailComponent extends InputBaseComponent {
  override name: string = "email";
  override type: string = "email";
  override placeholder: string = "usuario@grrrverse.com"
}
