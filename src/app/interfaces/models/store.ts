import { Model } from "./model"

export interface Store extends Model {
  store_id: number
  manager_staff_id: number
  address_id: number
}
