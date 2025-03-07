import { Component, inject } from '@angular/core';
import { AuthLayoutComponent } from "../../components/layouts/auth-layout/auth-layout.component";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'dashboard',
  imports: [AuthLayoutComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(dataService: DataService) {
    dataService.info.set({
      title: 'Dashboard'
    })
  }
}
