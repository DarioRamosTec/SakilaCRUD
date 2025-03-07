import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBagComponent } from './error-bag.component';

describe('ErrorBagComponent', () => {
  let component: ErrorBagComponent;
  let fixture: ComponentFixture<ErrorBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
