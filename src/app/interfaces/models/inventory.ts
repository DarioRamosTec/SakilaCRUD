import { Model } from "./model";

export interface Inventory extends Model {
  inventory_id: number
  film_id: number
  store_id: number
}
