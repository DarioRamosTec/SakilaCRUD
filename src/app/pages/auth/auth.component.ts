import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'auth',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `
})
export class AuthComponent {

}
