import { Model } from "./model"

export interface Rental extends Model {
  rental_id: number
  rental_date: Date
  inventory_id: number
  customer_id: number
  return_date: Date
  staff_id: number
}
