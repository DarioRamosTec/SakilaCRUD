import { Component } from '@angular/core';

let _id = 0
@Component({
  selector: 'base',
  imports: [],
  templateUrl: './base.component.html'
})
export class BaseComponent {
  _id = 0
  constructor() {
    this._id = _id
  }
}
