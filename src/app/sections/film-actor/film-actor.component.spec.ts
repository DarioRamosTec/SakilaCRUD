import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmActorComponent } from './film-actor.component';

describe('FilmActorComponent', () => {
  let component: FilmActorComponent;
  let fixture: ComponentFixture<FilmActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmActorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
