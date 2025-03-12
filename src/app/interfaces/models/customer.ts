import { Model } from "./model"

export interface Customer extends Model {
  customer_id: number
  store_id: number
  first_name: string
  last_name: string
  email: string
  address_id: number
  active: boolean
  create_date: string
}

