import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBaseComponent } from '../../../inputs/input-base/input-base.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'button-base',
  imports: [ReactiveFormsModule],
  templateUrl: './button-base.component.html'
})
export class ButtonBaseComponent extends InputBaseComponent {
  override type: string = "submit";
  override disabled: boolean = true;
  @Input()
  text: string = "";
  @Output()
  action: EventEmitter<boolean> = new EventEmitter();
}
