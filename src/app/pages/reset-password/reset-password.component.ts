import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../../validators/password-confirmation.directive';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment.development';
import { HttpErrorResponse } from '@angular/common/http';
import { InputPasswordComponent } from '../../components/inputs/input-password/input-password.component';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [FormBaseComponent, InputPasswordComponent, ButtonBaseComponent, TranslateModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent extends FormComponent {
  override form: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32),
      passwordConfirmationValidator()]]
    });

  override submit() {
    let self = this
    this.errors = new Map();

    this.authService.resetPassword(this.form.getRawValue()).subscribe({
      next(value) {
        self.form.reset()
        self.router.navigate(['/auth']);
        import('../../../js/test').then(randomFile=>{
          randomFile.showToast("Contraseña cambiada", "Se ha cambiado su contraseña.")
        });
      },
      error(err: HttpErrorResponse) {
        self.errors = self.dataService.setErrorsMap(err.error.errors)
      },
    })
  }

  get password() {
    return this.form.get('password');
  }
  get password_confirmation() {
    return this.form.get('password_confirmation');
  }
}
