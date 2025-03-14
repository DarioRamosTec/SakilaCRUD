import { Component, effect } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from '../../interfaces/models/actor';
import { SectionExtension } from '../../interfaces/section-extension';
import { BaseSectionComponent } from '../../pages/sections/base-section/base-section.component';
import { ActorService } from '../../services/actor.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { FilmActor } from '../../interfaces/models/film-actor';
import { FilmActorService } from '../../services/film-actor.service';
import { ModelsSignal } from '../../interfaces/model-signal';
import { ButtonBaseComponent } from '../../components/forms/buttons/button-base/button-base.component';
import { FormBaseComponent } from '../../components/forms/form-base/form-base.component';
import { InputSelectModelComponent } from '../../components/inputs/input-select-model/input-select-model.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { SectionComponent } from '../../components/section/section.component';
import { Film } from '../../interfaces/models/film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'section-film-actor',
  imports: [SectionComponent, FormBaseComponent, ButtonBaseComponent, InputSelectModelComponent],
  templateUrl: './film-actor.component.html'
})
export class FilmActorComponent extends BaseSectionComponent {
  override models: FilmActor[] = [];
  override formDefault = {
    actor_id: undefined,
    film_id: undefined,
  }
  override form: FormGroup = this.formBuilder.group({
    actor_id: [this.formDefault.actor_id, [Validators.required]],
    film_id: [this.formDefault.film_id, [Validators.required]],
  });
  override exceptions: string[] = ["last_update", "deleted_at"]
  override extensions: SectionExtension[] = [{
    title: "actor_id",
    type: "Actor"
  }, {
    title: "film_id",
    type: "Film"
  }]
  override id = "id"

  actors: ModelsSignal<Actor> = {
    models: [],
    loading: false
  }
  films: ModelsSignal<Film> = {
    models: [],
    loading: false
  }

  constructor(router: Router, authService: AuthService,
    dataService: DataService, protected actorService: ActorService,
    protected filmActorService: FilmActorService, protected filmService: FilmService) {
    super(router, authService, dataService)
    effect(() => {
      this.actors = actorService.models()
      this.films = filmService.models()
    })
    this.modelService = filmActorService
    dataService.info.set({
      title: "Film Actors"
    })
    this.index()
    actorService.initModels()
    filmService.initModels()
  }

  get actor_id() {
    return this.form.get('actor_id');
  }
  get film_id() {
    return this.form.get('film_id');
  }
}
