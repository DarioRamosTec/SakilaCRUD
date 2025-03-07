import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModelComponent } from "../../model/model.component";
import { PreloaderComponent } from "../preloader/preloader.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'auth-layout',
  imports: [MainHeaderComponent, SidebarComponent, RouterLink],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
  dataService = inject(DataService)
}
