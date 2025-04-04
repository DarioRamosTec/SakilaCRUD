import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthLayoutComponent } from '../../components/layouts/auth-layout/auth-layout.component';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-me',
  imports: [AuthLayoutComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {
  constructor(dataService: DataService, protected authService: AuthService) {
    dataService.info.set({
      title: 'Profile'
    })
  }
}
