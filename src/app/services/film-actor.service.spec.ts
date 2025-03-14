import { TestBed } from '@angular/core/testing';

import { FilmActorService } from './film-actor.service';

describe('FilmActorService', () => {
  let service: FilmActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
