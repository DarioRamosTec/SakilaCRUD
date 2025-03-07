import { Model } from "./model"

export interface Actor extends Model {
  actor_id: number
  first_name: string
  last_name: string
}
