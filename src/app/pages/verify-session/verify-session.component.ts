import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { environment } from '../../../environments/environment.development';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { InputEmailComponent } from '../../components/inputs/input-email/input-email.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { RouterLink } from '@angular/router';
import { InputPasswordComponent } from '../../components/inputs/input-password/input-password.component';

@Component({
  selector: 'app-verify-session',
  imports: [RouterLink, FormBaseComponent, InputPasswordComponent, ButtonBaseComponent],
  templateUrl: './verify-session.component.html',
  styleUrl: './verify-session.component.css'
})
export class VerifySessionComponent extends FormComponent {
  declare showToast: any;
  override form: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  override submit() {
    let self = this
    this.errors = new Map();

    this.authService.verifySession(this.form.getRawValue()).subscribe({
      next(value) {
        localStorage.setItem(environment.storageNames.token, value.data.value);
        self.authService.token.set(value.data)
        self.router.navigate(['/auth']);
      },
      error(err: HttpErrorResponse) {
        self.errors = self.dataService.setErrorsMap(err.error.errors)
      },
    })
  }

  send() {
    let self = this
    this.errors = new Map();

    this.authService.sendVerifySession().subscribe({
      next(value) {
        import('../../../js/test').then(randomFile=>{
          randomFile.showToast("Verificar sesión", "Se ha mandando un correo electrónico con las instrucciones para verificar su sesión.")
        });
      },
      error(err: HttpErrorResponse) {
        self.errors = self.dataService.setErrorsMap(err.error.errors)
      },
    })
  }

  get code() {
    return this.form.get('code');
  }
}

