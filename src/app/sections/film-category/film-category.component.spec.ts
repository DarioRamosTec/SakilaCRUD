import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCategoryComponent } from './film-category.component';

describe('FilmCategoryComponent', () => {
  let component: FilmCategoryComponent;
  let fixture: ComponentFixture<FilmCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
