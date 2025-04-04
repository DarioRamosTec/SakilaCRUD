import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { FormComponent } from '../form/form.component';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { InputPasswordComponent } from '../../components/inputs/input-password/input-password.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-send-reset-password',
  imports: [RouterLink, FormBaseComponent, InputEmailComponent, ButtonBaseComponent],
  templateUrl: './send-reset-password.component.html',
  styleUrl: './send-reset-password.component.css'
})
export class SendResetPasswordComponent extends FormComponent {
  declare showToast: any;
  override form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  override submit() {
    let self = this
    this.errors = new Map();

    this.authService.sendResetPassword(this.form.getRawValue()).subscribe({
      next(value) {
        import('../../../js/test').then(randomFile=>{
          randomFile.showToast("Restablecer contraseña", "Se ha mandando un correo electrónico con las instrucciones para restablecer tu contraseña.")
        });
      },
      error(err: HttpErrorResponse) {
        self.errors = self.dataService.setErrorsMap(err.error.errors)
      },
    })
  }

  get email() {
    return this.form.get('email');
  }
}
