import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from "../../components/forms/form-base/form-base.component";
import { InputEmailComponent } from "../../components/inputs/input-email/input-email.component";
import { InputPasswordComponent } from "../../components/inputs/input-password/input-password.component";
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { environment } from '../../../environments/environment.development';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  imports: [RouterLink, FormBaseComponent, InputEmailComponent, InputPasswordComponent, ButtonBaseComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent extends FormComponent {
  override form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
  });

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected route: ActivatedRoute) {
    super(router, authService, dataService)
    this.route.queryParams.subscribe(params => {
      if (params['t']) {
        localStorage.setItem(environment.storageNames.token, params['t']);
        if (params['u']) {
          switch (params['u']) {
            case "reset-password":
              this.router.navigate(['/auth/me/reset-password']);
            break;
          }
        } else {
          location.reload()
        }
      }
    });
  }

  override submit() {
    let self = this
    this.errors = new Map();

    this.authService.login(this.form.getRawValue()).subscribe({
      next(value) {
        localStorage.setItem(environment.storageNames.token, value.data.value);
        self.authService.token.set(value.data)
        self.router.navigate(['/verify']);
      },
      error(err: HttpErrorResponse) {
        self.errors = self.dataService.setErrorsMap(err.error.errors)
      },
    })
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
