import { Model } from "./model";

export interface Payment extends Model {
  payment_id: number
  customer_id: number
  staff_id: number
  rental_id: number
  amount: number
  payment_date: string
}
