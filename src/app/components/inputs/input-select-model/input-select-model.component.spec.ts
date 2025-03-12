import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectModelComponent } from './input-select-model.component';

describe('InputSelectModelComponent', () => {
  let component: InputSelectModelComponent;
  let fixture: ComponentFixture<InputSelectModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSelectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
