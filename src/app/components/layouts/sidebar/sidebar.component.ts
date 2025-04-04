import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  authService = inject(AuthService)
}
