import { Component, Input } from '@angular/core';
import { Model } from '../../../interfaces/models/model';
import { InputBaseComponent } from '../input-base/input-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorBagComponent } from '../../error-bag/error-bag.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'input-select-model',
  imports: [FormsModule, ReactiveFormsModule, ErrorBagComponent, TranslateModule],
  templateUrl: './input-select-model.component.html'
})
export class InputSelectModelComponent extends InputBaseComponent {
  @Input()
  options: (any | Model)[] = []
  @Input()
  modelId: string | undefined
  @Input()
  modelName: string | undefined
}
