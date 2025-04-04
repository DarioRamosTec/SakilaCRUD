import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink],
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent {
  authService = inject(AuthService)
  logout() {
    localStorage.setItem(environment.storageNames.token, "");
    location.reload()
  }
}
