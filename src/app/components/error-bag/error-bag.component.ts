import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import ErrorMessage from '../../interfaces/error-message';
import { AbstractControl } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'error-bag',
  imports: [NgIf],
  templateUrl: './error-bag.component.html'
})
export class ErrorBagComponent extends BaseComponent {
  @Input()
  errors: Map<string, ErrorMessage[]> = new Map()
  @Input()
  control: AbstractControl | null = null
  @Input()
  name: string = "_"
  @Input()
  ignoreDataArray: boolean = false

  public error(): string {
    return `${this.name}`
  }
}
