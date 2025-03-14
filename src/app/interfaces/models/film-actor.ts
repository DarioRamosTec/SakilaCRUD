import { Model } from "./model"

export interface FilmActor extends Model {
  actor_id: number
  film_id: number
}
