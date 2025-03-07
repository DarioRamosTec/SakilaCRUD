import { Component } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorBagComponent } from "../../error-bag/error-bag.component";

@Component({
  selector: 'input-password',
  imports: [FormsModule, ReactiveFormsModule, ErrorBagComponent],
  templateUrl: './input-password.component.html'
})
export class InputPasswordComponent extends InputBaseComponent {
  override name: string = "password";
  override type: string = "password";
  override placeholder: string = "••••••••"

}
