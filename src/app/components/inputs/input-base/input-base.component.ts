import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import ErrorMessage from '../../../interfaces/error-message';

@Component({
  selector: 'input-base',
  imports: [],
  templateUrl: './input-base.component.html'
})
export class InputBaseComponent extends BaseComponent {
  @Input()
  form: FormGroup = new FormGroup({})
  @Input()
  control: AbstractControl | null = null
  @Input()
  name: string = ""
  @Input()
  errors: Map<string, ErrorMessage[]> = new Map()
  @Input()
  label: string = ""

  @Input()
  small: boolean = false
  @Input()
  ignoreDataArray: boolean = false

  @Input()
  type: string = ""
  @Input()
  placeholder: string = ""
  @Input()
  disabled: boolean = false
  @Input()
  readonly: boolean = false
}
